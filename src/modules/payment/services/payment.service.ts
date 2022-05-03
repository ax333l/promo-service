import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities';
import { Repository } from 'typeorm';
import { User } from 'modules/users/entities';
import { CreatePaymentInput } from '../dto';
import { CreateFailedException, PaymentNotFoundException } from 'exceptions';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(
    user: User,
    createPaymentInput: CreatePaymentInput,
  ): Promise<Payment> {
    const paymentObject: Payment = {
      user,
      ...createPaymentInput,
    };

    const payment = this.paymentRepository.create(paymentObject);

    try {
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new CreateFailedException(error);
    }
  }

  async findAll(): Promise<Array<Payment>> {
    return await this.paymentRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id, {
      relations: ['user'],
    });
    if (!payment) {
      throw new PaymentNotFoundException();
    }
    return payment;
  }
}
