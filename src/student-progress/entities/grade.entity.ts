import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../entity/student.entity'; // Assuming you have a student entity

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, student => student.grades)
  student: Student;

  @Column()
  subject: string;

  @Column()
  grade: string;

  @Column()
  term: string;
}
