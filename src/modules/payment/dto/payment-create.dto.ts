import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int, { description: 'Money amount' })
  amount: number;
}
