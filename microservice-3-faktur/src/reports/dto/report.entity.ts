import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    npwp: string;

    @Column({name: 'tahun_pajak' })
    tahunPajak: string;

    @Column({ type: 'int'})
    pembetulan: number;

    @Column({ name: 'penghasilan_bruto', type: 'int'})
    penghasilanBruto: number;

    @Column({ type: 'int'})
    pengurang: number;

    @Column({ name: 'penghasilan_neto', type: 'int'})
    penghasilanNeto: number;

    @Column({ type: 'int'})
    ptkp: number;

    @Column({ type: 'int'})
    pkp: number;

    @Column({ name: 'pph_terutang', type: 'int'})
    pphTerutang: number;

    @Column({ name: 'kurang_lebih_bayar', type: 'int'})
    kurangLebihBayar: number;

    @Column()
    ntpn: string;

    @Column()
    status: string;

    @Column({ name: 'jumlah_bayar', type: 'int'})
    jumlahBayar: number;

    @Column({ name: 'pph_final',type: 'int'})
    pphFinal: number;

    @Column({ name: 'pph_final_terutang', type: 'int'})
    pphFinalTerutang: number;

    @Column({ type: 'int'})
    pengecualian: number;

    @Column({ type: 'int'})
    harta: number;

    @Column({ type: 'int'})
    utang: number;

    @CreateDateColumn({ name: 'creation_date', type: 'timestamp'})
    creationDate: Date;
    
}