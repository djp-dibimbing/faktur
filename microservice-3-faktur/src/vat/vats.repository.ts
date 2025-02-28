import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Vat } from "./dto/vat.entity";
import { CreateVatDto } from "./dto/create-vat.dto";
import { GetVatsFilterDto } from "./dto/get-vats-filter.dto";
 
@Injectable()
export class VatsRepository extends Repository<Vat> {
  constructor(private dataSource: DataSource) {
    super(Vat, dataSource.createEntityManager());
  }

  async getVats(filterDto: GetVatsFilterDto): Promise<Vat[]>{
    const { npwp, search } = filterDto;

    const query = this.createQueryBuilder('vat');

    if (npwp) {
      query.andWhere('vat.npwp = :npwp', { npwp });
    }

    if (search) {
      query.andWhere(
        'LOWER(vat.npwp) LIKE LOWER(:search) OR LOWER(vat.nomorFaktur) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const vats = await query.getMany();
    return vats;
  }

  async createVat(createVatDto: CreateVatDto, npwp: string): Promise<Vat> {
    
    const vat = this.create({
      npwp,
      ...createVatDto,
    });

    await this.save(vat);
    return vat;
  }

}
