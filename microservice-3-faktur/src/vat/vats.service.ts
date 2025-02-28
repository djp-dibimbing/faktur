import { Injectable, NotFoundException } from '@nestjs/common';
import { VatsRepository } from './vats.repository';
import { Vat } from './dto/vat.entity';
import { CreateVatDto } from './dto/create-vat.dto';
import { UpdateVatDto } from './dto/update-vat.dto';
import { GetVatsFilterDto } from './dto/get-vats-filter.dto';

@Injectable()
export class VatsService {

    constructor(private readonly vatsRepository: VatsRepository) {}

    getVats(filterDto: GetVatsFilterDto): Promise<Vat[]> {
        return this.vatsRepository.getVats(filterDto);
    }
    
    async getVatById(id: string): Promise<Vat> {
        const found = await this.vatsRepository.findOne({ where: { id } });
        if (!found) throw new NotFoundException(`Report with ID "${id}" not found!`);
        return found;
    }

    createVat(createVatDto: CreateVatDto, npwp: string ): Promise<Vat> {
        return this.vatsRepository.createVat(createVatDto, npwp);
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

