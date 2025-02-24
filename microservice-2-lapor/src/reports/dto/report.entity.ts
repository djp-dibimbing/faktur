import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ReportStatus } from "../report-satatus.enum";

@Entity()
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: ReportStatus;
}