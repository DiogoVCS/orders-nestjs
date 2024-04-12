import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {LocationModel, LocationSchema} from "./location.schema";
import {AbstractSchema} from "../abstract.schema";

@Schema({versionKey: false})
export class UserModel extends AbstractSchema {
    @Prop({type: LocationSchema, required: true})
    location: LocationModel;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    phoneNumber: string;

    @Prop({required: true})
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
