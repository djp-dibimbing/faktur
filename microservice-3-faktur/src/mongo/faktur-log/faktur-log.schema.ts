import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class FakturLog extends Document {
    @Prop({required: true})
    fakturId: string;

    @Prop()
    npwp: string;

    @Prop()
    nomorFaktur: string;

    @Prop()
    action: string; // created / updated / uploaded

}

export const FakturLogSchema = SchemaFactory.createForClass(FakturLog);