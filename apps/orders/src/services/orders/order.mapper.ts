import {Injectable} from "@nestjs/common";
import {Order} from "../../domain/orders/order";
import {UserMapper} from "../user/user.mapper";
import {convertToDecimal128} from "../../infrastructure/utils";
import {OrderModel} from "../../infrastructure/schemas/orders/order.schema";
import {UserModel} from "../../infrastructure/schemas/user/user.schema";
import {PackageModel} from "../../infrastructure/schemas/orders/package.schema";
import {Package} from "../../domain/orders/package";

@Injectable()
export class OrderMapper {

    constructor(private readonly userMapper: UserMapper) {
    }

    mapToDAO(order: Order): Omit<OrderModel, '_id'> {
        return {
            price: convertToDecimal128(order.price),
            state: order.state.state
        } as Omit<OrderModel, '_id'>
    }

    mapToDomain(orderModel: OrderModel) {
        const dropOff = this.userMapper.mapToDomain(orderModel.dropOff as unknown as UserModel)
        const pickUp = this.userMapper.mapToDomain(orderModel.pickUp as unknown as UserModel)

        return new Order(dropOff, pickUp, this.mapPackagesToDomain(orderModel.packages), orderModel.state)
    }

    mapPackagesToDomain(models: PackageModel[]): Package[] {
        return models.map(({height, length, width, weight}) => new Package({height, length, width}, weight))
    }
}
