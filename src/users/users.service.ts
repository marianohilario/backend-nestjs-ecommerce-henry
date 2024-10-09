import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password' | 'isAdmin'>[]> {
    return (await this.usersRepository.getUsers(page, limit)).map(
      ({ password, isAdmin, ...rest }) => rest,
    );
  }
  async getUserById(id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.getUserById(id);
    const { password, ...rest } = user;
    return rest;
  }

  async updateUser(id: string, dataToUpdate: Partial<User>): Promise<string> {
    return await this.usersRepository.updateUser(id, dataToUpdate);
  }

  async deleteUser(id: string): Promise<string> {
    return await this.usersRepository.deleteUser(id);
  }
}
