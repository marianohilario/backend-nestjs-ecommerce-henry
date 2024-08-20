import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async getUsers(page: number, limit: number): Promise<Omit<User, 'password'>[]> {
    return (await this.usersRepository.getUsers(page, limit)).map(
      ({ password, ...rest }) => rest,
    );
  }
  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.getUserById(id);
    const { password, ...rest } = user;
    return rest;
  }
  async createUser(userData: User): Promise<number> {
    return await this.usersRepository.createUser(userData);
  }

  async updateUser(id: string, dataToUpdate: User): Promise<number> {
    return await this.usersRepository.updateUser(id, dataToUpdate);
  }

  async deleteUser(id: string): Promise<number> {
    return await this.usersRepository.deleteUser(id);
  }
}
