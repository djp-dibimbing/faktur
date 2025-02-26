import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
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
    getReports(@Query() filterDto: GetReportsFilterDto): Promise<Report[]> {
        return this.reportsService.getReports(filterDto);
    }

    @Get('/:id')
    getReportById(@Param('id') id: string): Promise<Report> {
        return this.reportsService.getReportById(id);
    }

    @Post()
    createReport(@Body() createReportDto: CreateReportDto ): Promise<Report>{
        return this.reportsService.createReport(createReportDto);
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

    // @Get()
    // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {

    //     if (Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilter(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
        
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string, 
    //     @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    // ): Task {
    //     const { status } = updateTaskStatusDto;
    //     return this.tasksService.updateTaskStatus(id, status);
    // }


}
