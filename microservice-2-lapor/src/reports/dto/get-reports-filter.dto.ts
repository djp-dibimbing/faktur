import { IsOptional, IsString } from "class-validator";

export class GetReportsFilterDto {
    @IsOptional()
    @IsString()
    npwp?: string;

    @IsOptional()
    @IsString()
    search?: string;
}