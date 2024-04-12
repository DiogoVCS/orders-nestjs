import {Injectable, Logger} from "@nestjs/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {OrderModel} from "../../schemas/orders/order.schema";
import {Connection, Model} from "mongoose";
import {AbstractRepository} from "../abstract.repository";

@Injectable()
export class OrdersRepository extends AbstractRepository<OrderModel> {
    protected readonly logger = new Logger(OrdersRepository.name)

    constructor(@InjectModel(OrderModel.name) model: Model<OrderModel>,
                @InjectConnection() connection: Connection) {
        super(model, connection)
    }

    findAndPopulate(id: string) {
        return this.model.findById(id).populate("dropOff").populate("pickUp").exec()
    }

    async findOrdersByDropOffLocation(partialAddress: string, exactZipCode: string): Promise<OrderModel[]> {
        const matchConditions = {}

        if (partialAddress) {
            matchConditions['dropOffUser.location.address'] = {$regex: new RegExp(partialAddress, 'i')};
        }

        if (exactZipCode) {
            matchConditions['dropOffUser.location.zipCode'] = exactZipCode;
        }

        return this.model.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'dropOff',
                    foreignField: '_id',
                    as: 'dropOffUser'
                }
            },
            {$unwind: '$dropOffUser'},
            {
                $match: matchConditions
            },
            {
                $project: {
                    dropOff: 0,
                    pickUp: 0,
                    packages: 0,
                    price: 0,
                    state: 0,
                    dropOffUser: 0,
                    _id: 1
                }
            }
        ]);
    }

}
