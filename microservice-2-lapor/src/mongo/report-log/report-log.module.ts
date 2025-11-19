import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportLog, ReportLogSchema } from './report-log.schema';
import { ReportLogService } from './report-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportLog.name, schema: ReportLogSchema },
    ]),
  ],
  providers: [ReportLogService],
  exports: [ReportLogService],
})
export class ReportLogModule {}
