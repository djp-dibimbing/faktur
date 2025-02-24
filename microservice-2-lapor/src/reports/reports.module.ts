import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from "./reports.service";
import { ReportController } from "./reports.controller";
import { ReportsRepository } from "./reports.repository";
import { Report } from "./dto/report.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  exports: [ReportsService],
  controllers: [ReportController],
  providers: [ReportsService, ReportsRepository],
})
export class ReportsModule {}