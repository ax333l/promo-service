import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Payment } from 'modules/payment/entities';

@Entity({ name: 'users' })
@InputType('UserInput')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'User ID' })
  id: number;

  @Column({
    nullable: true,
    unique: true,
  })
  @Field(() => String, { description: 'User name', nullable: true })
  username: string | null;

  @Column({
    type: 'integer',
    default: 0,
  })
  @Field(() => Int, { description: 'User balance', nullable: true })
  balance: number;

  @OneToMany(() => Payment, (payment: Payment) => payment.user, {
    nullable: false,
  })
  @Field(() => [Payment], {
    description: "User payments",
    nullable: true,
  })
  payments: Payment[];
}
