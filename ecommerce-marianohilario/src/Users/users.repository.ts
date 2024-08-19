import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'mariano@mail.com',
      name: 'Mariano',
      password: 'asd123',
      address: 'calle falsa 123',
      phone: '1151339874',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 2,
      email: 'sofia@mail.com',
      name: 'Sofía',
      password: 'qwe456',
      address: 'avenida siempre viva 456',
      phone: '1154445678',
      country: 'Argentina',
      city: 'Córdoba',
    },
    {
      id: 3,
      email: 'juan@mail.com',
      name: 'Juan',
      password: 'zxc789',
      address: 'calle las rosas 789',
      phone: '1156778899',
      country: 'Argentina',
      city: 'Rosario',
    },
    {
      id: 4,
      email: 'maria@mail.com',
      name: 'María',
      password: 'qaz112',
      address: 'calle de la luna 112',
      phone: '1153221144',
      country: 'Argentina',
      city: 'Mendoza',
    },
    {
      id: 5,
      email: 'lucas@mail.com',
      name: 'Lucas',
      password: 'wsx223',
      address: 'avenida libertad 223',
      phone: '1158996677',
      country: 'Argentina',
      city: 'La Plata',
    },
    {
      id: 6,
      email: 'florencia@mail.com',
      name: 'Florencia',
      password: 'edc334',
      address: 'calle del sol 334',
      phone: '1151442233',
      country: 'Argentina',
      city: 'Mar del Plata',
    },
  ];

  async getUsers(): Promise<User[]> {
    return this.users;
  }
}
