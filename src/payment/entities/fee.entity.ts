import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../../entity/student.entity';

@Entity()
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  semester: string;

  @Column()
  amountDue: number;

  @Column()
  amountPaid: number;

  @Column()
  dueDate: Date;

  @Column()
  balance: number;

  @Column({ default: 'unpaid' })
  status: string; // "paid" or "unpaid"

  
}
