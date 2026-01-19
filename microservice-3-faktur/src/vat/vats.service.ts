import { Injectable, NotFoundException } from '@nestjs/common';
import { VatsRepository } from './vats.repository';
import { Vat } from './dto/vat.entity';
import { CreateVatDto } from './dto/create-vat.dto';
import { UpdateVatDto } from './dto/update-vat.dto';
import { GetVatsFilterDto } from './dto/get-vats-filter.dto';
import { InvoiceCounterService } from 'src/nomor/invoice-counter.service';
import { KafkaSevice } from 'src/kafka/kafka.service';
import { FakturLogService } from 'src/mongo/faktur-log/faktur-log.service';

@Injectable()
export class VatsService {

    constructor(
        private readonly vatsRepository: VatsRepository,
        private readonly invoiceCounterService: InvoiceCounterService,
        private readonly kafkaService: KafkaSevice,
        private readonly fakturLogService: FakturLogService
    ) {}

    getVats(filterDto: GetVatsFilterDto): Promise<Vat[]> {
        return this.vatsRepository.getVats(filterDto);
    }
    
    async getVatById(id: string): Promise<Vat> {
        const found = await this.vatsRepository.findOne({ where: { id } });
        if (!found) throw new NotFoundException(`Faktur dengan ID "${id}" tidak ditemukan!`);
        return found;
    }

    async createVat(createVatDto: CreateVatDto, npwp: string ): Promise<Vat> {

        const tahunSekarang = new Date().getFullYear();
        const lastNumber = await this.invoiceCounterService.getNextInvoiceNumber(tahunSekarang);
        const nomorFaktur = this.generateNomorFaktur(tahunSekarang, lastNumber, createVatDto.kodeTransaksi);

        const vat = await this.vatsRepository.createVat(createVatDto, npwp, nomorFaktur);
        await this.vatsRepository.save(vat);

        await this.fakturLogService.createLog({
            fakturId: vat.id,
            npwp,
            nomorFaktur,
            action: 'created',
        });

        await this.kafkaService.send('create-faktur', {
            id: vat.id,
            npwp,
            nomorFaktur,
            tanggalPembuatanFaktur: vat.tanggalPembuatanFaktur,
            tinNik: vat.tinNikPembeli,
            createdAt: new Date(),
        });

        return vat;
    }

    private generateNomorFaktur(year: number, lastNumber: number, kode: string): string {
        const tahunDuaDigit = year.toString().slice(-2); // Ambil 2 digit terakhir dari tahun
        const nomorUrut = lastNumber.toString().padStart(8, "0"); // Format ke 8 digit

        return `${kode}.${tahunDuaDigit}.${nomorUrut}`;
    }

    async deleteVat(id: string): Promise<void> {
        const result = await this.vatsRepository.delete(id);
        if (result.affected === 0) {
        throw new NotFoundException(`Faktur dengan ID "${id}" tidak ditemukan`);
        }
    }

    async updateVat(id: string, updateVatDto: UpdateVatDto): Promise<Vat> {
        const vat = await this.getVatById(id);
        
        const updatedVat = await this.vatsRepository.updateVat(vat, updateVatDto);

        // simpan log
        await this.fakturLogService.updateLog({
            fakturId: updatedVat.id,
            npwp: updatedVat.npwp,
            nomorFaktur: updatedVat.nomorFaktur,
            action: 'updated',
        });

        // kirim event Kafka
        await this.kafkaService.send('update-faktur', {
            id: updatedVat.id,
            npwp: updatedVat.npwp,
            nomorFaktur: updatedVat.nomorFaktur,
            tanggalPembuatanFaktur: updatedVat.tanggalPembuatanFaktur,
            tinNik: updatedVat.tinNikPembeli,
            updatedAt: new Date(),
        });

        return updatedVat;
    }
}

