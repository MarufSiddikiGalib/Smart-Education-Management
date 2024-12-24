import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../entity/student.entity'; // Assuming you have a student entity

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, student => student.attendance)
  student: Student;

  @Column()
  date: string;

  @Column()
  status: 'present' | 'absent' | 'late';
}
