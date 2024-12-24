import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

}
