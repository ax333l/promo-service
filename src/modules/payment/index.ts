import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities';
import { PaymentResolver } from './resolvers';
import { PaymentService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}
