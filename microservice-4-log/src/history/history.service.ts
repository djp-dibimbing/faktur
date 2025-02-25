import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('History') private readonly historyModel: Model<History>,
  ) {}

  async create(history: Partial<History>): Promise<History> {
    const createdHistory = new this.historyModel(history);
    return createdHistory.save();
  }

  async get(): Promise<History[]> {
    return this.historyModel.find().exec();
  }

  async update(id: string, history: Partial<History>): Promise<History | null> {
    return this.historyModel
      .findByIdAndUpdate(id, history, { new: true })
      .exec();
  }

  async delete(id: string): Promise<History | null> {
    return this.historyModel.findByIdAndDelete(id).exec();
  }
}
