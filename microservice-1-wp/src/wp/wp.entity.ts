import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  npwp!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  nama!: string;

  @Column()
  tempatlahir!: string;

  @Column({ type: 'date' })
  tanggallahir!: string;

  @Column()
  bentuk!: string;

  @Column()
  alamat!: string;

  @Column()
  kontak!: string;

  @Column()
  jenisusaha!: string;

  @Column()
  kpp!: string;

  @Column()
  password!: string;
}
