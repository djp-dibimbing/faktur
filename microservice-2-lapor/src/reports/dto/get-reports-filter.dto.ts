import { IsEnum, IsOptional, IsString } from "class-validator";
import { ReportStatus } from "../report-satatus.enum";

export class GetReportsFilterDto {
    @IsOptional()
    @IsEnum(ReportStatus)
    status?: ReportStatus;

    @IsOptional()
    @IsString()
    search?: string;
}