import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from "./reports.service";
import { ReportController } from "./reports.controller";
import { ReportsRepository } from "./reports.repository";
import { Report } from "./dto/report.entity";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { MinioService } from "src/minio/minio.service";
import { ReportLogService } from "src/mongo/report-log/report-log.service";
import { ReportLogModule } from "src/mongo/report-log/report-log.module";
import { KafkaModule } from "src/kafka/kafka.module";
@Module({
  imports: [
    ReportLogModule,
    KafkaModule,
    TypeOrmModule.forFeature([Report]),
  ],
  exports: [ReportsService, MinioService],
  controllers: [ReportController],
  providers: [ReportsService, ReportsRepository, JwtStrategy, MinioService],
})
export class ReportsModule {}