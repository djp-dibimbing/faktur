import { IsNotEmpty } from "class-validator";

export class CreateReportDto {

    // @IsNotEmpty()
    // title: string;

    // @IsNotEmpty()
    // description: string;

    @IsNotEmpty()
    npwp: string;

    @IsNotEmpty()
    tahunPajak: string;

    @IsNotEmpty()
    pembetulan: number;

    @IsNotEmpty()
    penghasilanBruto: number;

    @IsNotEmpty()
    pengurang: number;

    @IsNotEmpty()
    penghasilanNeto: number;

    @IsNotEmpty()
    pkp: number;

    @IsNotEmpty()
    pphTerutang: number;

    @IsNotEmpty()
    kurangLebihBayar: number;

    @IsNotEmpty()
    ntpn: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    pphFinal: number;

    @IsNotEmpty()
    pphFinalTerutang: number;

    @IsNotEmpty()
    pengecualian: number;

    @IsNotEmpty()
    harta: number;

    @IsNotEmpty()
    utang: number;

    // @IsNotEmpty()
    creationDate: Date;
}