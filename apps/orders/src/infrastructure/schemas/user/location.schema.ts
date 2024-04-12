import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {AbstractSchema} from "../abstract.schema";

@Schema({versionKey: false})
export class LocationModel extends AbstractSchema {
    @Prop({required: true})
    address: string;

    @Prop({required: true})
    city: string;

    @Prop({required: true})
    country: string;

    @Prop({required: true})
    zipCode: string;
}

export const LocationSchema = SchemaFactory.createForClass(LocationModel);
