import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportLog } from './report-log.schema';

@Injectable()
export class ReportLogService {
  constructor(
    @InjectModel(ReportLog.name)
    private reportLogModel: Model<ReportLog>,
  ) {}

  async createLog(data: any) {
    return await this.reportLogModel.create(data);
  }
}
