import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Report } from "./dto/report.entity";
 
@Injectable()
export class ReportsRepository extends Repository<Report> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }
}
