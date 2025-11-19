import { Entity, CreateDateColumn, Column, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "vat" })
export class Vat {
    
    @PrimaryColumn({ type: "uniqueidentifier", default: () => "NEWID()" })
    id: string = uuidv4();

    @Column({ name: "npwp", type: "varchar", length: 20 })
    npwp: string;

    @Column({name: 'kode_transaksi' })
    kodeTransaksi: string;

    @CreateDateColumn({ name: "creation_date", type: "datetime2" })
    tanggalPembuatanFaktur: Date;

    @Column({ name: 'tin_nik_pembeli'})
    tinNikPembeli: string;

    @Column({ name: 'nomor_faktur'})
    nomorFaktur: string;
}