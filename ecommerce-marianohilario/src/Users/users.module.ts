import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
