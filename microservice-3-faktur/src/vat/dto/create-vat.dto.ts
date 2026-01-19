import { IsDateString, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateVatDto {

    @IsNotEmpty({message: 'Kode transaksi harus diisi' })
    @IsString()
    @Length(1, 10, {message: 'Panjang kode transaksi harus antara 1 hingga 10 karakter'})
    kodeTransaksi: string;

    @IsNotEmpty({message: 'Tanggal pembuatan faktur harus diisi'})
    tanggalPembuatanFaktur: Date;

    @IsNotEmpty()
    @IsString()
    @Length(15, 16, {message: 'Panjang TIN/NIK pembeli harus antara 15 hingga 16 karakter'})
    @Matches(/^\d+$/, {message: 'TIN/NIK pembeli harus berupa angka'})
    tinNikPembeli: string;

    // @IsOptional()
    // nomorFaktur: string;
}