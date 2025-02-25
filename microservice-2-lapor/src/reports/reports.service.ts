import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { Report } from './dto/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { GetReportsFilterDto } from './dto/get-reports-filter.dto';

@Injectable()
export class ReportsService {

    constructor(private readonly reportsRepository: ReportsRepository) {}

    getReports(filterDto: GetReportsFilterDto): Promise<Report[]> {
        return this.reportsRepository.getReports(filterDto);
    }
    
    async getReportById(id: string): Promise<Report> {
        const found = await this.reportsRepository.findOne({ where: { id } });
        if (!found) throw new NotFoundException(`Report with ID "${id}" not found!`);
        return found;
    }

    createReport(createReportDto: CreateReportDto): Promise<Report> {
        return this.reportsRepository.createReport(createReportDto);
    }

    async deleteReport(id: string): Promise<void> {
        const result = await this.reportsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Report with ID "${id}" not found`);
        }
    }

    async updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
        const report = await this.getReportById(id);

        Object.assign(report, updateReportDto);

        await this.reportsRepository.save(report);
        return report;
    }

}

