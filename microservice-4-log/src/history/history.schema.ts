import { Schema } from 'mongoose';

export const HistorySchema = new Schema(
  {
    tanggal: { type: Date, default: Date.now },
    status: { type: String, required: true },
    action: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { strict: false },
);

export interface History extends Document {
  tanggal: Date;
  action: string;
  userId: string;
  status: string;
  [key: string]: any;
}
