import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateReportDto {

    @IsOptional()
    @IsString()
    npwp?: string;

    @IsOptional()
    @IsString()
    tahunPajak?: string;

    @IsOptional()
    // @IsNumber()
    pembetulan?: number;

    @IsOptional()
    @IsNumber()
    penghasilanBruto?: number;

    @IsOptional()
    @IsNumber()
    pengurang?: number;

    @IsOptional()
    @IsNumber()
    penghasilanNeto?: number;

    @IsOptional()
    @IsNumber()
    pkp?: number;

    @IsOptional()
    @IsNumber()
    pphTerutang?: number;

    @IsOptional()
    @IsNumber()
    kurangLebihBayar?: number;

    @IsOptional()
    @IsString()
    ntpn?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsNumber()
    pphFinal?: number;

    @IsOptional()
    @IsNumber()
    pphFinalTerutang?: number;

    @IsOptional()
    @IsNumber()
    pengecualian?: number;

    @IsOptional()
    @IsNumber()
    harta?: number;

    @IsOptional()
    @IsNumber()
    utang?: number;

    @IsOptional()
    @IsString()
    fileUrl: string;
    
}