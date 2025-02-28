import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Vat } from "./dto/vat.entity";
import { CreateVatDto } from "./dto/create-vat.dto";
import { GetVatsFilterDto } from "./dto/get-vats-filter.dto";
 
@Injectable()
export class VatsRepository extends Repository<Vat> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async getReports(filterDto: GetVatsFilterDto): Promise<Vat[]>{
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

  async createReport(createVatDto: CreateVatDto, npwp: string): Promise<Vat> {
 
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
      creationDate} = createVatDto;

    const vat = this.create({
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

    await this.save(vat);
    return vat;
  }

}
