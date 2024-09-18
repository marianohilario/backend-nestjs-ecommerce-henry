import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (!user){
      throw new NotFoundException('ID de usuario no encontrado');
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

    if (!userExists || (userExists && userExists.id === id)) {
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
