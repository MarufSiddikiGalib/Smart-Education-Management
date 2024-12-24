import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StudentProgressModule } from './student-progress/student-progress.module';
import { PaymentModule } from './payment/payment.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';




@Module({
  imports: [UserModule, StudentProgressModule, PaymentModule , ],
   
  controllers: [AppController],

  providers: [AppService, ],


  
})
export class AppModule {}


