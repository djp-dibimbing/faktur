import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateVatDto {

    @IsNotEmpty()
    kodeTransaksi: string;

    @IsNotEmpty()
    tanggalPembuatanFaktur: Date;

    @IsNotEmpty()
    tinNikPembeli: string;

    // @IsOptional()
    // nomorFaktur: string;
}