import { Controller, Get, Post, Body, Param, HttpException, HttpStatus ,UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
//import { AuthGuard } from '../auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  //@UseGuards(AuthGuard)
  // Endpoint payment status
  @Get('status/:studentId')
  async getPaymentStatus(@Param('studentId') studentId: number) {
    return this.paymentService.getPaymentStatus(studentId);
  }


  //@UseGuards(AuthGuard)
  // Endpoint fees
  @Post('pay')
  async payFees(
    @Body('studentId') studentId: number,
    @Body('amount') amount: number,
    @Body('bankName') bankName: string,
  ) {
    return this.paymentService.payFees(studentId, amount, bankName);
  }
}
