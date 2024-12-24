import { Controller, Get, Param , Req, UseGuards} from '@nestjs/common';
import { StudentProgressService } from './student-progress.service';
//import { AuthGuard } from '../auth.guard';

@Controller('student-progress')
export class StudentProgressController {

 

  constructor(private readonly studentProgressService: StudentProgressService) {}


 // @UseGuards(AuthGuard)
  // Endpoint student grades
  @Get('grades/:studentId')
  async getGrades(@Param('studentId') studentId: number) {
    return this.studentProgressService.getGrades(studentId);
  }


 //@UseGuards(AuthGuard)
  // Endpoint student attendance
  @Get('attendance/:studentId')
  async getAttendance(@Param('studentId') studentId: number) {
    return this.studentProgressService.getAttendance(studentId);
  }


  


}

