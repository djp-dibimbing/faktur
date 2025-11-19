import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Request, UploadedFile, UseInterceptors} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './dto/report.entity';
import { UpdateReportDto } from './dto/update-report.dto';
import { GetReportsFilterDto } from './dto/get-reports-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { MinioService } from 'src/minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';


@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportController {
    constructor(private reportsService: ReportsService, private minioService: MinioService){}

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
    @UseInterceptors(FileInterceptor('file'))
    async updateReport(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string, 
        @Body() updateReport: UpdateReportDto,
        @Request() req,
    ): Promise<{message: string, data: any}> {

        const data = await this.getReportById(id);
        const npwp = req.user?.username;
        const tahunPajak = data.tahunPajak;

        // jika file diperbaharui -- Tentukan nama file & bucket

        if (file){
            const fileExt = extname(file.originalname);
            const objectName = `spt_${npwp}_${tahunPajak}${fileExt}`;
            const bucketName = `spt-files`;

            // pastikan bucket ada
            await this.minioService.ensureBucket(bucketName);

            // upload file ke minio
            await this.minioService.client.putObject(
                bucketName,
                objectName,
                file.buffer,
                file.size,
                {'Content-type': file.mimetype},
            );

            // dapatkan URL file
            const fileUrl = `http://localhost:9001/${bucketName}/${objectName}`;

            // SImpan data ke DB
            const report = await this.reportsService.updateSpt(
                id, updateReport, fileUrl
            );


            return {
                message: '✅ Laporan SPT berhasil diunggah dan disimpan!',
                data: {
                    ...report,
                    file: {
                        name: objectName,
                        url: fileUrl,
                    },
                },
            };
        }

        // jika file tidak diperbaharui — lakukan update tanpa file dan kembalikan response serupa
        const report = await this.reportsService.updateSpt(id, updateReport, undefined);
        return {
            message: '✅ Laporan berhasil diperbarui!',
            data: report,
        };
    }

    @Post('/upload/spt')
    @UseInterceptors(FileInterceptor('file'))
    async uploadSPT(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: {npwp: string; tahun_pajak: string}
    ){
        if (!file) throw new Error('File tidak ditemukan');

        const fileExt = extname(file.originalname);
        const objectName = `spt_${body.npwp}_${body.tahun_pajak}${fileExt}`;
        const bucketName = 'spt-files';

        // Pastikan bucket sudah ada
        await this.minioService.ensureBucket(bucketName);

        // Upload ke MinIO
        await this.minioService.client.putObject(
        bucketName,
        objectName,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype },
        );

        const fileUrl = `http://localhost:9001/${bucketName}/${objectName}`;

        return {
            message: '✅ Laporan SPT berhasil diunggah ke MinIO!',
            data: {
                npwp: body.npwp,
                tahun_pajak: body.tahun_pajak,
                filename: objectName,
                url: fileUrl,
            },
        };
    }

    @Post('/lapor')
    @UseInterceptors(FileInterceptor('file'))
    async laporSPT(
        @UploadedFile() file: Express.Multer.File,
        @Body() createReportDto: CreateReportDto,
        @Request() req,
    ) {
        if (!file) throw new Error('File tidak ditemukan');

        const npwp = req.user?.username;
        const tahunPajak = createReportDto.tahunPajak;

        // 🔹 Tentukan nama file & bucket
        const fileExt = extname(file.originalname);
        const objectName = `spt_${npwp}_${tahunPajak}${fileExt}`;
        const bucketName = 'spt-files';

        // 🔹 Pastikan bucket ada
        await this.minioService.ensureBucket(bucketName);

        // 🔹 Upload file ke MinIO
        await this.minioService.client.putObject(
            bucketName,
            objectName,
            file.buffer,
            file.size,
            { 'Content-Type': file.mimetype },
        );

        // 🔹 Dapatkan URL file
        const fileUrl = `http://localhost:9001/${bucketName}/${objectName}`;

        // 🔹 Simpan data ke DB (via service)
        const report = await this.reportsService.laporSpt(
            createReportDto, npwp, fileUrl
        );

        // 🔹 Tambahkan info file ke hasil response
        return {
            message: '✅ Laporan SPT berhasil diunggah dan disimpan!',
            data: {
            ...report,
            file: {
                name: objectName,
                url: fileUrl,
            },
            },
        };
    }

    
}
