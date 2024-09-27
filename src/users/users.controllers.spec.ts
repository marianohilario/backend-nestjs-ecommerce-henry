import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  let usersController: UsersController;
  let mockUsersService: Partial<UsersService>;

  const mockUsers = [
    {
      id: '1',
      name: 'Mariano',
      email: '4sD9H@example.com',
      address: 'Calle falsa 123',
      phone: 123456789,
      isAdmin: false,
      orders: [],
    },
    {
      id: '2',
      name: 'Maria',
      email: 'test@example.com',
      address: 'Calle verdadera 456',
      phone: 987654321,
      isAdmin: false,
      orders: [],
    },
  ];

  beforeEach(async () => {
    mockUsersService = {
      getUsers: jest.fn().mockResolvedValue(mockUsers),
      getUserById: jest.fn().mockResolvedValue(mockUsers[0]),
      updateUser: jest.fn().mockResolvedValue('1'),
      deleteUser: jest.fn().mockResolvedValue('1'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      // Mock del AuthGuard y RolesGuard
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('getUsers() should return an array of users', async () => {
    const result = await usersController.getUsers('1', '5');
    expect(result).toEqual([
      {
        id: '1',
        name: 'Mariano',
        email: '4sD9H@example.com',
        address: 'Calle falsa 123',
        phone: 123456789,
        isAdmin: false,
        orders: [],
      },
      {
        id: '2',
        name: 'Maria',
        email: 'test@example.com',
        address: 'Calle verdadera 456',
        phone: 987654321,
        isAdmin: false,
        orders: [],
      },
    ]);
  });

  it('getUserById() should return a single user', async () => {
    const result = await usersController.getUserById('1');
    expect(result).toEqual({
      id: '1',
      name: 'Mariano',
      email: '4sD9H@example.com',
      address: 'Calle falsa 123',
      phone: 123456789,
      isAdmin: false,
      orders: [],
    });
  });

  it('updateUser() should return updated user id', async () => {
    const result = await usersController.updateUser('1', {
      name: 'Mariano',
      email: '4sD9H@example.com',
      address: 'Calle falsa 123',
      phone: 123456789,
      password: 'secret123',
      isAdmin: false,
    });
    expect(result).toBe('1');
  });

  it('deleteUser() should return deleted user id', async () => {
    const result = await usersController.deleteUser('1');
    expect(result).toEqual('1');
  });
});
