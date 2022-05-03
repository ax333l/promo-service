import { Args, Mutation, Resolver, Int, Query } from '@nestjs/graphql';
import { Payment } from '../entities';
import { PaymentService } from '../services';
import { CreatePaymentInput } from '../dto';
import { User } from 'modules/users/entities';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async createPayment(
    @Args('User') user: User,
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return this.paymentService.createPayment(user, createPaymentInput);
  }

  @Query(() => Payment, { name: 'payment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.findOne(id);
  }

  @Query(() => [Payment], { name: 'payments' })
  findAll(): Promise<Array<Payment>> {
    return this.paymentService.findAll();
  }
}
