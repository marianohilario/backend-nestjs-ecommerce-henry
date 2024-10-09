import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockUsersRepository: Partial<UsersRepository>;

  const mockUser = {
    id: '1',
    name: 'Mariano',
    email: '4sD9H@example.com',
    address: 'Calle falsa 123',
    phone: 123456789,
  };

  beforeEach(async () => {
    mockUsersRepository = {
      getUsers: () =>
        Promise.resolve([{ ...mockUser } as User]),
      getUserById: (id: string) => Promise.resolve({ ...mockUser, orders: [] }),
      updateUser: (id: string, dataToUpdate: User) => Promise.resolve(id),
      deleteUser: (id: string) => Promise.resolve(id),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('getUsers() should return an array of users', async () => {
    const users = await usersService.getUsers(1, 5);
    expect(users).toEqual([
      {
        id: '1',
        name: 'Mariano',
        email: '4sD9H@example.com',
        address: 'Calle falsa 123',
        phone: 123456789,
      } as User,
    ]);
  });

  it('getUserById() should return a user', async () => {
    const user = await usersService.getUserById('1');
    expect(user).toEqual({
      id: '1',
      name: 'Mariano',
      email: '4sD9H@example.com',
      address: 'Calle falsa 123',
      phone: 123456789,
      orders: [],
    });
  });

  it('updateUser() should update a user and return the user id', async () => {
    const user = await usersService.updateUser('1', {
      name: 'Mariano',
      email: '4sD9H@example.com',
      address: 'Calle falsa 123',
      phone: 123456789,
    } as User);
    expect(user).toEqual('1');
  });

  it('deleteUser() should delete a user and return the user id', async () => {
    const user = await usersService.deleteUser('1');
    expect(user).toEqual('1');
  });
});
