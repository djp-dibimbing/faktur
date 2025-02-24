import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { Report } from './dto/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportStatus } from './report-satatus.enum';


@Injectable()
export class ReportsService {

    constructor(private readonly reportsRepository: ReportsRepository) {}

    async getTaskById(id: string): Promise<Report> {
        const found = await this.reportsRepository.findOne({ where: { id } });
        if (!found) throw new NotFoundException(`Report with ID "${id}" not found!`);
        return found;
    }

    async createTask(createReportDto: CreateReportDto): Promise<Report> {

        const {title, description} = createReportDto;

        const report = this.reportsRepository.create({
            title,
            description,
            status: ReportStatus.OPEN,
        });

        await this.reportsRepository.save(report);
        return report;
    }
    

    // getAllTasks() {
    //     return this.tasks;
    // }

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

    // createTask(createTaskDto: CreateTaskDto): Task {

    //     const {title, description} = createTaskDto;

    //     const task: Task = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);

    //     this.tasks = this.tasks.filter((task) => task.id !== id);
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

