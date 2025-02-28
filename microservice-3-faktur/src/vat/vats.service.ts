import { Injectable, NotFoundException } from '@nestjs/common';
import { VatsRepository } from './vats.repository';
import { Vat } from './dto/vat.entity';
import { CreateVatDto } from './dto/create-vat.dto';
import { UpdateVatDto } from './dto/update-vat.dto';
import { GetVatsFilterDto } from './dto/get-vats-filter.dto';

@Injectable()
export class VatsService {

    constructor(private readonly reportsRepository: VatsRepository) {}

    getReports(filterDto: GetVatsFilterDto): Promise<Vat[]> {
        return this.reportsRepository.getReports(filterDto);
    }
    
    async getReportById(id: string): Promise<Vat> {
        const found = await this.reportsRepository.findOne({ where: { id } });
        if (!found) throw new NotFoundException(`Report with ID "${id}" not found!`);
        return found;
    }

    createReport(createReportDto: CreateVatDto, npwp: string ): Promise<Vat> {
        return this.reportsRepository.createReport(createReportDto, npwp);
    }

    async deleteReport(id: string): Promise<void> {
        const result = await this.reportsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Report with ID "${id}" not found`);
        }
    }

    async updateReport(id: string, updateVatDto: UpdateVatDto): Promise<Vat> {
        const vat = await this.getReportById(id);

        Object.assign(vat, updateVatDto);

        await this.reportsRepository.save(vat);
        return vat;
    }

}

