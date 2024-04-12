import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {SchemaTypes, Types} from "mongoose";
import {AbstractSchema} from "../abstract.schema";
import {PackageModel, PackageSchema} from "./package.schema";
import {OrderStateEnum} from "../../../domain/orders/order-state.config";

@Schema({versionKey: false})
export class OrderModel extends AbstractSchema {
    @Prop({type: SchemaTypes.ObjectId, ref: 'UserModel'})
    dropOff: Types.ObjectId;

    @Prop({type: SchemaTypes.ObjectId, ref: 'UserModel'})
    pickUp: Types.ObjectId;

    @Prop({type: [PackageSchema], required: true})
    packages: PackageModel[];

    @Prop({type: SchemaTypes.Decimal128})
    price: Types.Decimal128;

    @Prop({type: String, enum: OrderStateEnum, required: true})
    state: OrderStateEnum;
}


export const OrderSchema = SchemaFactory.createForClass(OrderModel)
