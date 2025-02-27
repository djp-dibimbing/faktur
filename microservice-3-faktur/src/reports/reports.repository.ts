import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Report } from "./dto/report.entity";
import { CreateReportDto } from "./dto/create-report.dto";
import { GetReportsFilterDto } from "./dto/get-reports-filter.dto";
 
@Injectable()
export class ReportsRepository extends Repository<Report> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async getReports(filterDto: GetReportsFilterDto): Promise<Report[]>{
    const { npwp, search } = filterDto;

    const query = this.createQueryBuilder('report');

    if (npwp) {
      query.andWhere('report.npwp = :npwp', { npwp });
    }

    if (search) {
      query.andWhere(
        'LOWER(report.npwp) LIKE LOWER(:search) OR LOWER(report.ntpn) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const reports = await query.getMany();
    return reports;
  }

  async createReport(createReportDto: CreateReportDto, npwp: string): Promise<Report> {
 
    const {tahunPajak,
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
