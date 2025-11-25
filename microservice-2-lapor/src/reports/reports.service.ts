import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { Report } from './dto/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { GetReportsFilterDto } from './dto/get-reports-filter.dto';
import { ReportLogService } from 'src/mongo/report-log/report-log.service';
import { KafkaSevice } from 'src/kafka/kafka.service';

@Injectable()
export class ReportsService {
    

    constructor(
        private readonly reportsRepository: ReportsRepository,
        private readonly reportLogService: ReportLogService,
        private readonly kafkaService: KafkaSevice
    ) {}

    getReports(filterDto: GetReportsFilterDto): Promise<Report[]> {
        return this.reportsRepository.getReports(filterDto);
    }
    
    async getReportById(id: string): Promise<Report> {
        const found = await this.reportsRepository.findOne({ where: { id } });
        if (!found) throw new NotFoundException(`Report with ID "${id}" not found!`);
        return found;
    }

    createReport(createReportDto: CreateReportDto, npwp: string ): Promise<Report> {
        return this.reportsRepository.createReport(createReportDto, npwp);
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

    async laporSpt(createReportDto: CreateReportDto, npwp: string, fileUrl: string) {
        // 1. Simpan / proses ke database utama (SQL)
        const report = await this.reportsRepository.laporSpt(
            createReportDto,
            npwp,
            fileUrl,
        );

        // 2. Log ke MongoDB
        await this.reportLogService.createLog({
            reportId: report.id,
            npwp: npwp,
            tahunPajak: report.tahunPajak,
            action: 'created',
            fileUrl: fileUrl,
        });

        // kirim event ke Kafka
        await this.kafkaService.send('lapor-spt', {
            id: report.id,
            npwp: npwp,
            tahunPajak: report.tahunPajak,
            status: report.status,
            createdAt: new Date(),
        });

        // 3. RETURN data utama
        return report;

    }


    async updateSpt(id: string, updateReportDto: UpdateReportDto, fileUrl: string): Promise<Report> {
        const report = await this.getReportById(id);

        report.fileUrl = fileUrl
        Object.assign(report, updateReportDto);

        await this.reportsRepository.save(report);
        return report;
    }

}

