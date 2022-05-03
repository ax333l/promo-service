import { ObjectType, Field, Int, InputType, GraphQLTimestamp } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'modules/users/entities';

@Entity({ name: 'payments' })
@InputType('PaymentInput')
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'Payment ID' })
  id: number;

  @Column({ type: 'integer' })
  @Field(() => Int, { description: 'Money amount', nullable: true })
  amount: number;

  @ManyToOne(() => User, (user: User) => user.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @Field(() => User, { description: 'User payment' })
  user: User;

  @CreateDateColumn()
  @Field(() => GraphQLTimestamp, { description: 'Created at'})
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLTimestamp, { description: 'Updated at'})
  updated_at: Date;
}
