import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Vat } from "./dto/vat.entity";
import { CreateVatDto } from "./dto/create-vat.dto";
import { GetVatsFilterDto } from "./dto/get-vats-filter.dto";
import { FakturLogService } from "src/mongo/faktur-log/faktur-log.service";
import { KafkaSevice } from "src/kafka/kafka.service";
 
@Injectable()
export class VatsRepository extends Repository<Vat> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly fakturLogService: FakturLogService,
    private readonly kafkaService: KafkaSevice
  ) {
    super(Vat, dataSource.createEntityManager())
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

  async createVat(createVatDto: CreateVatDto, npwp: string, nomorFaktur: string): Promise<Vat> {
    
    const vat = this.create({
      npwp,
      ...createVatDto,
      nomorFaktur,
    });

    await this.fakturLogService.createLog({
      fakturId: vat.id,
      npwp: npwp,
      nomorFaktur: vat.nomorFaktur,
      action: 'created'
    })

    await this.kafkaService.send('create-faktur', {
      id: vat.id,
      npwp: npwp,
      nomorFaktur: nomorFaktur,
      tanggalPembuatanFaktur: vat.tanggalPembuatanFaktur,
      tinNik: vat.tinNikPembeli,
      createdAt: new Date(),
    });

    await this.save(vat);
    return vat;
  }

}
