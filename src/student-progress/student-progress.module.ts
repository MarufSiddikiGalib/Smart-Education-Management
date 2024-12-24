import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentProgressController } from './student-progress.controller';
import { StudentProgressService } from './student-progress.service';
import { Grade } from './entities/grade.entity';
import { Attendance } from './entities/attendance.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Grade, Attendance]),],
  controllers: [StudentProgressController],
  providers: [StudentProgressService, ],


  
})
export class StudentProgressModule {}

