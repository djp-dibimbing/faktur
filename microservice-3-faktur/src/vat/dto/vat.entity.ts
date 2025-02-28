import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vat {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    npwp: string;

    @Column({name: 'kode_transaksi' })
    kodeTransaksi: string;

    @CreateDateColumn({ name: 'tanggal_pembuatan_faktur', type: 'timestamp'})
    tanggalPembuatanFaktur: Date;

    @Column({ name: 'tin_nik_pembeli'})
    tinNikPembeli: string;

    @Column({ name: 'nomor_faktur'})
    nomorFaktur: string;
}