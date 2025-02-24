import { IsEnum } from "class-validator";
import { ReportStatus } from "../report-satatus.enum";

export class UpdateReportStatusDto {
    @IsEnum(ReportStatus)
    status: ReportStatus;
}