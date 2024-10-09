import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dtos/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    const offset = (page - 1) * limit;
    return await this.userRepository
      .createQueryBuilder('user')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    if (!user) {
      throw new NotFoundException('User ID not found');
    }
    const { password, isAdmin, ...rest } = user;

    return rest;
  }

  async createUser(userData: CreateUsersDto): Promise<Partial<User>> {
    const newUser = await this.userRepository.save(userData);
    const { password, confirmPassword, isAdmin, ...rest } = newUser;
    return rest;
  }

  async updateUser(id: string, dataToUpdate: Partial<User>): Promise<string> {
    const userExists = await this.userRepository.findOne({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('User ID not found');
    }

    if (dataToUpdate.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: dataToUpdate.email },
      });
      if (emailExists && emailExists.id !== id) {
        throw new BadRequestException(
          'The email is already registered for another user.',
        );
      }
    }
    await this.userRepository.update(id, dataToUpdate);
    return `User with ID: "${id}" has been updated successfully.`;
  }

  async deleteUser(id: string): Promise<string> {
    const userExists = await this.userRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException('User ID not found');
    }
    await this.userRepository.delete(id);
    return `User with ID: "${id}" has been deleted successfully.`;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
