import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "report" })
export class Report {
  @PrimaryColumn({ type: "uniqueidentifier", default: () => "NEWID()" })
  id: string = uuidv4();

  @Column({ name: "npwp", type: "varchar", length: 20 })
  npwp: string;

  @Column({ name: "tahun_pajak", type: "varchar", length: 4 })
  tahunPajak: string;

  @Column({ name: "pembetulan", type: "int" })
  pembetulan: number;

  @Column({ name: "penghasilan_bruto", type: "int" })
  penghasilanBruto: number;

  @Column({ name: "pengurang", type: "int" })
  pengurang: number;

  @Column({ name: "penghasilan_neto", type: "int" })
  penghasilanNeto: number;

  @Column({ name: "ptkp", type: "int" })
  ptkp: number;

  @Column({ name: "pkp", type: "int" })
  pkp: number;

  @Column({ name: "pph_terutang", type: "int" })
  pphTerutang: number;

  @Column({ name: "kurang_lebih_bayar", type: "int" })
  kurangLebihBayar: number;

  @Column({ name: "ntpn", type: "varchar", length: 50, nullable: true })
  ntpn: string;

  @Column({ name: "status", type: "varchar", length: 10 })
  status: string;

  @Column({ name: "jumlah_bayar", type: "int" })
  jumlahBayar: number;

  @Column({ name: "pph_final", type: "int" })
  pphFinal: number;

  @Column({ name: "pph_final_terutang", type: "int" })
  pphFinalTerutang: number;

  @Column({ name: "pengecualian", type: "int" })
  pengecualian: number;

  @Column({ name: "harta", type: "int" })
  harta: number;

  @Column({ name: "utang", type: "int" })
  utang: number;

  @CreateDateColumn({ name: "creation_date", type: "datetime2" })
  creationDate: Date;

  @Column({ name: "file_url", type: "varchar", length: 500 })
  fileUrl: string;
}
