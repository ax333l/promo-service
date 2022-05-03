import { NotFoundException } from '@nestjs/common';

export class PaymentNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('Payment not found', error);
  }
}
