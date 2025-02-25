import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { Report } from './dto/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportStatus } from './report-satatus.enum';


@Injectable()
export class ReportsService {

    constructor(private readonly reportsRepository: ReportsRepository) {}

    async getAllReports(): Promise<Report[]> {
        return this.reportsRepository.find();
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

    

    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if(status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter((tasks) => {
    //             if (tasks.title.includes(search)  || tasks.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }

    //     return tasks;
    // }


    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);

    //     task.status = status;
    //     return task;
    // }

    // updateTask(id: string): Task {
    //     const task = this.getTaskById(id);

    //     task.status = TaskStatus.IN_PROGRESS;
    //     return task;
    // }
}

