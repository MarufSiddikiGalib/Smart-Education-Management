import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee } from './entities/fee.entity';
import { Bank } from './entities/bank.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Fee) private feeRepository: Repository<Fee>,
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {}

  // Get payment status for a student
  async getPaymentStatus(studentId: number) {
    const feeDetails = await this.feeRepository.findOne({ where: { studentId } });

    if (!feeDetails) {
      throw new HttpException('Fee details not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: feeDetails.amountDue > 0 ? 'Unpaid' : 'Paid',
      details: feeDetails,
    };
  }

  // Pay fees for a student
  async payFees(studentId: number, amount: number, bankName: string) {
    // Validate bank name
    const bank = await this.bankRepository.findOne({ where: { name: bankName } });
    if (!bank) {
      throw new HttpException('Invalid bank name', HttpStatus.BAD_REQUEST);
    }

    // Get fee details for the student
    const feeDetails = await this.feeRepository.findOne({ where: { studentId } });
    if (!feeDetails) {
      throw new HttpException('Fee details not found', HttpStatus.NOT_FOUND);
    }

    // Update payment details
    feeDetails.amountPaid += amount;
    feeDetails.amountDue -= amount;

    if (feeDetails.amountDue < 0) {
      throw new HttpException('Overpayment is not allowed', HttpStatus.BAD_REQUEST);
    }

    await this.feeRepository.save(feeDetails);

    return { message: 'Payment slip printed', feeDetails };
  }
}
