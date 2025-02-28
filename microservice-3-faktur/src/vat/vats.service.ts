import { Injectable, NotFoundException } from '@nestjs/common';
import { VatsRepository } from './vats.repository';
import { Vat } from './dto/vat.entity';
import { CreateVatDto } from './dto/create-vat.dto';
import { UpdateVatDto } from './dto/update-vat.dto';
import { GetVatsFilterDto } from './dto/get-vats-filter.dto';
import { InvoiceCounterService } from 'src/nomor/invoice-counter.service';

@Injectable()
export class VatsService {

    constructor(
        private readonly vatsRepository: VatsRepository,
        private readonly invoiceCounterService: InvoiceCounterService) {}

    getVats(filterDto: GetVatsFilterDto): Promise<Vat[]> {
        return this.vatsRepository.getVats(filterDto);
    }
    
    async getVatById(id: string): Promise<Vat> {
        const found = await this.vatsRepository.findOne({ where: { id } });
        if (!found) throw new NotFoundException(`Report with ID "${id}" not found!`);
        return found;
    }

    async createVat(createVatDto: CreateVatDto, npwp: string ): Promise<Vat> {

        const tahunSekarang = new Date().getFullYear();

        // Ambil nomor urut terbaru dari counter
        const lastNumber = await this.invoiceCounterService.getNextInvoiceNumber(tahunSekarang);

        const kode = createVatDto.kodeTransaksi;

        // Generate nomor faktur baru
        const nomorFaktur = this.generateNomorFaktur(tahunSekarang, lastNumber, kode);

        return this.vatsRepository.createVat(createVatDto, npwp, nomorFaktur);
    }

    private generateNomorFaktur(year: number, lastNumber: number, kode: string): string {
        const kodeTransaksi = kode; // Kode transaksi default
        const tahunDuaDigit = year.toString().slice(-2); // Ambil 2 digit terakhir dari tahun
        const nomorUrut = lastNumber.toString().padStart(8, "0"); // Format ke 8 digit

        return `${kodeTransaksi}.${tahunDuaDigit}.${nomorUrut}`;
    }

    async deleteVat(id: string): Promise<void> {
        const result = await this.vatsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Report with ID "${id}" not found`);
        }
    }

    async updateVat(id: string, updateVatDto: UpdateVatDto): Promise<Vat> {
        const vat = await this.getVatById(id);

        Object.assign(vat, updateVatDto);

        await this.vatsRepository.save(vat);
        return vat;
    }
    

}

