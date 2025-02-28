import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Request} from '@nestjs/common';
import { VatsService } from './vats.service';
import { CreateVatDto } from './dto/create-vat.dto';
import { Vat } from './dto/vat.entity';
import { UpdateVatDto } from './dto/update-vat.dto';
import { GetVatsFilterDto } from './dto/get-vats-filter.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class VatController {
    constructor(private vatsService: VatsService){}

    @Get()
    async getReports(@Query() filterDto: GetVatsFilterDto): Promise<{data: Vat[]}> {
        const vats = await this.vatsService.getReports(filterDto);
        return {
            data: vats
        }
    }

    @Get('/:id')
    getReportById(@Param('id') id: string): Promise<Vat> {
        return this.vatsService.getReportById(id);
    }

    @Post()
    async createReport(@Request() req,
    @Body() createVatDto: CreateVatDto ): Promise< {message: string, data: Vat}>{
        const npwp  = req.user.username;
        const vat = await this.vatsService.createReport(createVatDto, npwp );
        return {
            message: 'Faktur berhasil dibuat',
            data: vat
        };
    }

    @Delete('/:id')
    deleteReport(@Param('id') id: string): Promise<void> {
        return this.vatsService.deleteReport(id);
    }

    @Patch('/:id')
    updateReport(
        @Param('id') id: string, 
        @Body() updateVat: UpdateVatDto,
    ): Promise<Vat> {
        return this.vatsService.updateReport(id, updateVat);
    }
    
}
