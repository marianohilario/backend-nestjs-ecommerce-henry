import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enum/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    let isPasswordValid = false;

    if (user) isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new BadRequestException('Email o password incorrecto.');
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);

    return {
      token,
      message: 'Sesión iniciada con éxito',
    };
  }

  async signUp(userData: CreateUsersDto) {
    const user = await this.usersRepository.findByEmail(userData.email);
    if (user) {
      throw new BadRequestException('El email ya se encuentra registrado');
    }

    if (userData.password !== userData.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('No se pudo encriptar la contraseña');
    }

    return this.usersRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  }
}
