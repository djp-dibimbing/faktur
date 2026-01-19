import { IsDate, IsOptional, IsString, Length } from "class-validator";

export class UpdateVatDto {

    @IsOptional()
    @IsString()
    @Length(1, 16, {message: 'Panjang NPWP harus antara 15 hingga 16 karakter'})
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