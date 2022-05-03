import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from 'exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find({ relations: ['payments'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['payments'],
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepository.remove(user);
    return { success: true };
  }
}
