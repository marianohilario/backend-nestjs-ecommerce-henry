import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number = 1, limit: number = 5): Promise<User[]> {
    const offset = (page - 1) * limit;
    return await this.userRepository
      .createQueryBuilder('user')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
  }

  async createUser(userData: Partial<User>): Promise<string> {
    const newUser = await this.userRepository.save(userData);
    return newUser.id;
  }

  async updateUser(id: string, dataToUpdate: User): Promise<string> {
    const emailExists = await this.userRepository.findOne({
      where: { email: dataToUpdate.email },
    });
    if (!emailExists || (emailExists && emailExists.id === id)) {
      await this.userRepository.update(id, dataToUpdate);
      return id;
    }
    return 'El email ya se encuentra registrado para otro usuario';
  }

  async deleteUser(id: string): Promise<string> {
    await this.userRepository.delete(id);
    return id;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
