import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../entity/student.entity'; 


@Injectable()
export class StudentProgressService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  // Fetch student grades
  async getGrades(studentId: number) {
    return this.gradeRepository.find({ where: { student: { id: studentId } } });
  }

  // Fetch student attendance
  async getAttendance(studentId: number) {
    return this.attendanceRepository.find({ where: { student: { id: studentId } } });
  }

  // Any other logic like calculating progress, etc.
}
