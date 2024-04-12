import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateOrderDTO} from "../../dto/orders/create-order.dto";
import {OrdersRepository} from "../../infrastructure/repositories/orders/orders.repository";
import {Order} from "../../domain/orders/order";
import {Location} from "../../domain/users/location";
import {User} from "../../domain/users/user";
import {Package} from "../../domain/orders/package";
import {OrderModel} from "../../infrastructure/schemas/orders/order.schema";
import {OrderMapper} from "./order.mapper";
import {UserService} from "../user/user.service";
import {CreateOrderResponseDTO} from "../../dto/orders/create-order-response.dto";
import {UpdateStateDTO} from "../../dto/orders/update-state.dto";
import {OrderStateEnum} from "../../domain/orders/order-state.config";


@Injectable()
export class OrdersService {

    constructor(private readonly repository: OrdersRepository,
                private readonly userService: UserService,
                private readonly orderMapper: OrderMapper) {
    }

    async createOrder(request: CreateOrderDTO): Promise<CreateOrderResponseDTO> {
        const dropOffLocation = new Location(request.dropoff.address, request.dropoff.city, request.dropoff.country, request.dropoff.zipcode);
        const dropOffUser = new User(dropOffLocation, request.dropoff.email, request.dropoff.phonenumber, request.dropoff.name);

        const pickUpLocation = new Location(request.pickup.address, request.pickup.city, request.pickup.country, request.pickup.zipcode);
        const pickUpUser = new User(pickUpLocation, request.pickup.email, request.pickup.phonenumber, request.pickup.name);

        const packages = request.packages.map(dto => new Package({
            length: dto.length,
            width: dto.width,
            height: dto.height
        }, dto.weight))

        const dropOffUserId = await this.userService.createUser(dropOffUser)
        const pickUpUserId = await this.userService.createUser(pickUpUser)

        const order = new Order(dropOffUser, pickUpUser, packages);

        const orderSchema: Omit<OrderModel, '_id'> = this.orderMapper.mapToDAO(order)

        const orderCreated = await this.repository.create({
            ...orderSchema,
            dropOff: dropOffUserId,
            pickUp: pickUpUserId,
            packages: order.packages.map((thisPackage) => ({
                weight: thisPackage.weight,
                width: thisPackage.dimensions.width,
                length: thisPackage.dimensions.length,
                height: thisPackage.dimensions.height
            }))
        });

        return {
            id: orderCreated._id.toString(),
            status: order.state.state,
            price: order.price
        }
    }

    async getOrders(searchParams?: { zipCode: string, address: string }) {
        if (!searchParams.zipCode && !searchParams.address) {
            return this.repository.find({})
        }

        const result = await this.repository.findOrdersByDropOffLocation(searchParams.address, searchParams.zipCode)
        return result.map(value => value._id);
    }

    async updateOrderStatus(id: string, dto: UpdateStateDTO) {
        const orderModel = await this.repository.findAndPopulate(id)

        if (!orderModel) {
            throw new HttpException("Order not Found", HttpStatus.NOT_FOUND)
        }

        const order: Order = this.orderMapper.mapToDomain(orderModel)
        const oldState = order.state.state;
        order.state.next(dto.state.toUpperCase() as OrderStateEnum)


        await this.repository.upsert({_id: id}, {state: order.state.state})

        return {
            id,
            newState: order.state.state,
            oldState
        }
    }
}
