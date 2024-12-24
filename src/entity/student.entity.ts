import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne,OneToOne } from 'typeorm';
import { Grade } from '../student-progress/entities/grade.entity'; 
import { Attendance } from '../student-progress/entities/attendance.entity'; 
import { User } from '../user/user.entity';
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.child) 
  parent: User;

  // One student can have many grades
  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];

  // One student can have many attendance records
  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Attendance[];
}
