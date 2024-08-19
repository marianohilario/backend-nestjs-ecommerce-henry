import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.getUsers();
  }
}
