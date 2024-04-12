import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {AbstractSchema} from "../abstract.schema";

@Schema({versionKey: false})
export class PackageModel {
    @Prop({required: true})
    weight: number;

    @Prop({required: true})
    height: number;

    @Prop({required: true})
    length: number;

    @Prop({required: true})
    width: number
}

export const PackageSchema = SchemaFactory.createForClass(PackageModel);
