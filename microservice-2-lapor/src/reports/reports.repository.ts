import { DataSource, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Report } from "./dto/report.entity";
import { CreateReportDto } from "./dto/create-report.dto";
import { ReportStatus } from "./report-satatus.enum";
 
@Injectable()
export class ReportsRepository extends Repository<Report> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async createReport(createReportDto: CreateReportDto): Promise<Report> {
 
    const {npwp, tahunPajak,
      pembetulan,
      penghasilanBruto,
      pengurang,
      penghasilanNeto,
      pkp,
      pphTerutang,
      kurangLebihBayar,
      ntpn,
      status,
      pphFinal,
      pphFinalTerutang,
      pengecualian,
      harta,
      utang,
      creationDate} = createReportDto;

    const report = this.create({
        // title,
        // description,
        // status: ReportStatus.OPEN,
        npwp,
        tahunPajak,
        pembetulan,
        penghasilanBruto,
        pengurang,
        penghasilanNeto,
        pkp,
        pphTerutang,
        kurangLebihBayar,
        ntpn,
        status,
        pphFinal,
        pphFinalTerutang,
        pengecualian,
        harta,
        utang,
        creationDate: new Date(),
    });

    await this.save(report);
    return report;
  }

}
