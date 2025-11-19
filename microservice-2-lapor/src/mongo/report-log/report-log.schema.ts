import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type ReportLogDocument = ReportLog & Document;

@Schema({ timestamps: true })
export class ReportLog extends Document{
  @Prop({ required: true })
  reportId: string;

  @Prop()
  npwp: string;

  @Prop()
  tahunPajak: string;

  @Prop()
  action: string; // created / updated / uploaded

  @Prop()
  fileUrl: string;
}

export const ReportLogSchema = SchemaFactory.createForClass(ReportLog);
