import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './dto/report.entity';

@Controller('reports')
export class ReportController {
    constructor(private reportsService: ReportsService){}

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Report> {
        return this.reportsService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createReportDto: CreateReportDto ): Promise<Report>{
        return this.reportsService.createTask(createReportDto);
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

    // @Patch('/:id')
    // updateTask(
    //     @Param('id') id: string, 
    // ): Task {
    //     return this.tasksService.updateTask(id);
    // }
    
}
