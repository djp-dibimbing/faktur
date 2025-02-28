import { IsOptional, IsString } from "class-validator";

export class GetVatsFilterDto {
    @IsOptional()
    @IsString()
    npwp?: string;

    @IsOptional()
    @IsString()
    search?: string;
}