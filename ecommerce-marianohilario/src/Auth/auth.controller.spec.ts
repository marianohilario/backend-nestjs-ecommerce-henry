import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: Partial<AuthService>;

  const mockUserData: CreateUsersDto = {
    name: 'Mariano',
    email: '4sD9H@example.com',
    password: '123456',
    confirmPassword: '123456',
    address: 'Calle falsa 123',
    phone: 123456789,
  };

  beforeEach(async () => {
    mockAuthService = {
      signUp: (mockUserData: CreateUsersDto) =>
        Promise.resolve({
          id: '1',
          name: 'Mariano',
          email: '4sD9H@example.com',
          address: 'Calle falsa 123',
          phone: 123456789,
        }),
      signIn: (email: string, password: string) =>
        Promise.resolve({
          token: 'token',
          message: 'Sesión iniciada con éxito',
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('signUp() creates a new user with an encripted password', async () => {
    const user = await authController.signUp(mockUserData);
    expect(user).toBeDefined();
    expect(user).toEqual({
      id: '1',
      name: 'Mariano',
      email: '4sD9H@example.com',
      address: 'Calle falsa 123',
      phone: 123456789,
    });
  });

  it('signUp() throws an error if the email is already in use', async () => {
    mockAuthService.signUp = () =>
      Promise.reject('El email ya se encuentra registrado');
    try {
      await authController.signUp(mockUserData);
    } catch (error) {
      expect(error).toEqual('El email ya se encuentra registrado');
    }
  });

  it('signIn() signs in a user and returns a token and a message', async () => {
    const token = await authController.signIn({
      email: mockUserData.email,
      password: mockUserData.password,
    } as LoginUserDto);
    expect(token).toBeDefined();
    expect(token).toEqual({
      token: 'token',
      message: 'Sesión iniciada con éxito',
    });
  });

  it('signIn() throws an error if the password is incorrect', async () => {
    mockAuthService.signIn = () =>
      Promise.reject('Email o password incorrecto.');
    try {
      await authController.signIn({
        email: mockUserData.email,
        password: mockUserData.password,
      } as LoginUserDto);
    } catch (error) {
      expect(error).toEqual('Email o password incorrecto.');
    }
  });

  it('signIn() throws an error if the user does not exist', async () => {
    mockAuthService.signIn = () =>
      Promise.reject('Email o password incorrecto.');
    try {
      await authController.signIn({
        email: '4sD9H@example.com',
        password: '123456',
      } as LoginUserDto);
    } catch (error) {
      expect(error).toEqual('Email o password incorrecto.');
    }
  });
});
