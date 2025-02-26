import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from "./reports.service";
import { ReportController } from "./reports.controller";
import { ReportsRepository } from "./reports.repository";
import { Report } from "./dto/report.entity";
import { JwtStrategy } from "src/auth/jwt.strategy";
@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  exports: [ReportsService],
  controllers: [ReportController],
  providers: [ReportsService, ReportsRepository, JwtStrategy],
})
export class ReportsModule {}