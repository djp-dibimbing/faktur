import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class InvoiceCounter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    year: number;

    @Column({ default: 0 })
    last_number: number;
}
