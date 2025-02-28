import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Request} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './dto/report.entity';
import { UpdateReportDto } from './dto/update-report.dto';
import { GetReportsFilterDto } from './dto/get-reports-filter.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportController {
    constructor(private reportsService: ReportsService){}

    @Get()
    async getReports(@Query() filterDto: GetReportsFilterDto): Promise<{data: Report[]}> {
        const reports = await this.reportsService.getReports(filterDto);
        return {
            data: reports
        }
    }

    @Get('/:id')
    getReportById(@Param('id') id: string): Promise<Report> {
        return this.reportsService.getReportById(id);
    }

    @Post()
    async createReport(@Request() req,
    @Body() createReportDto: CreateReportDto ): Promise< {message: string, data: Report}>{
        const npwp  = req.user.username;
        const report = await this.reportsService.createReport(createReportDto, npwp );
        return {
            message: 'Laporan berhasil dibuat',
            data: report
        };
    }

    @Delete('/:id')
    deleteReport(@Param('id') id: string): Promise<void> {
        return this.reportsService.deleteReport(id);
    }

    @Patch('/:id')
    updateReport(
        @Param('id') id: string, 
        @Body() updateReport: UpdateReportDto,
    ): Promise<Report> {
        return this.reportsService.updateReport(id, updateReport);
    }
    
}
