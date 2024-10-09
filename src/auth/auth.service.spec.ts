import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { CreateUsersDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersRepository: Partial<UsersRepository>;

  const mockUser: CreateUsersDto = {
    name: 'Mariano',
    email: '4sD9H@example.com',
    password: '123456',
    confirmPassword: '123456',
    address: 'Calle falsa 123',
    phone: 123456789,
  };

  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: () => Promise.resolve(undefined),
      createUser: (userData: CreateUsersDto): Promise<Partial<User>> =>
        Promise.resolve({
          id: '1',
          isAdmin: false,
          ...userData,
        }),
    };

    const mockJwtService = {
      sign: (payload) => jwt.sign(payload, 'testSecret'),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signUp() creastes a new user with an encripted password', async () => {
    const user = await authService.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toBe(mockUser.password);
  });

  it('signUp() throws an error if the email is already in use', async () => {
    mockUsersRepository.findByEmail = (email: string) =>
      Promise.resolve(mockUser as unknown as User);
    try {
      await authService.signUp(mockUser as CreateUsersDto);
    } catch (error) {
      expect(error.message).toEqual('The email is already registered.');
    }
  });

  it('signIn() returns an error if the password is invalid', async () => {
    mockUsersRepository.findByEmail = (email: string) =>
      Promise.resolve(mockUser as unknown as User);
    try {
      await authService.signIn(mockUser.email, 'INVALID PASSWORD');
    } catch (error) {
      expect(error.message).toEqual('Incorrect email or password.');
    }
  });

  it('signIn() returns an error if the user does not exist', async () => {
    try {
      await authService.signIn(mockUser.email, mockUser.password);
    } catch (error) {
      expect(error.message).toEqual('Incorrect email or password.');
    }
  });

  it('signIn() returns an object with a token and a message if the credentials are correct', async () => {
    const mockUserVariant = {
      ...mockUser,
      password: await bcrypt.hash(mockUser.password, 10),
    };
    mockUsersRepository.findByEmail = (email: string) =>
      Promise.resolve(mockUserVariant as unknown as User);

    const response = await authService.signIn(
      mockUser.email,
      mockUser.password,
    );

    expect(response).toBeDefined();
    expect(response.token).toBeDefined();
    expect(response.message).toEqual('Session started successfully');
  });
});
