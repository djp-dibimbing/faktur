import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Vat } from "./dto/vat.entity";
import { CreateVatDto } from "./dto/create-vat.dto";
import { GetVatsFilterDto } from "./dto/get-vats-filter.dto";
import { UpdateVatDto } from "./dto/update-vat.dto";
 
@Injectable()
export class VatsRepository extends Repository<Vat> {

  constructor(
    private readonly dataSource: DataSource,
  ){
    super(Vat, dataSource.createEntityManager());
  }

  async getVats(filterDto: GetVatsFilterDto): Promise<Vat[]> {
    const { npwp, search } = filterDto;

    const query = this.createQueryBuilder('vat');

    if (npwp) {
      query.andWhere('vat.npwp = :npwp', { npwp });
    }

    if (search) {
      query.andWhere(
        '(LOWER(vat.npwp) LIKE LOWER(:search) OR ' +
        ' LOWER(vat.nomorFaktur) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async createVat(createVatDto: CreateVatDto, npwp: string, nomorFaktur: string): Promise<Vat> {
    return this.create({ 
      npwp, 
      nomorFaktur, 
      ...createVatDto 
    });
  }

  async updateVat(vat: Vat, dto: UpdateVatDto): Promise<Vat> {
    Object.assign(vat, dto);
    return await this.save(vat);
  }

}
