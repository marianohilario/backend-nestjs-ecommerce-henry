import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Get Auth';
  }
  async signIn(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || user?.password !== password) {
      throw new BadRequestException('Email o password incorrecto');
    }
    return 'Login exitoso';
  }
}
