import { Entity, PrimaryGeneratedColumn, Column , OneToOne, JoinColumn } from 'typeorm';
import { Student } from '../entity/student.entity'; 

@Entity() // Marks this class as a database table
export class User {
  @PrimaryGeneratedColumn() // Auto-generated primary key
  id: number;

  @Column({ unique: true }) // Email must be unique
  email: string;

  @Column() // Password field
  password: string;

  @Column() // Name field
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: 'parent' }) 
  role: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  otpExpiresAt: Date;

  @OneToOne(() => Student)
  @JoinColumn()
  child: Student; // Relation to the Student entity
}
