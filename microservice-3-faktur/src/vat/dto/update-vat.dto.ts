import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateVatDto {

    @IsOptional()
    @IsString()
    npwp?: string;

    @IsOptional()
    @IsString()
    kodeTransaksi?: string;

    @IsOptional()
    @IsDate()
    tanggalPembuatanFaktur?: Date;

    @IsOptional()
    @IsString()
    tinNikPembeli?: string;

    @IsOptional()
    @IsString()
    nomorFaktur?: number;
    
}