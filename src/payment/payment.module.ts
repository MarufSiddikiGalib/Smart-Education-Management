import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Fee } from './entities/fee.entity';
import { Bank } from './entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Bank])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}

