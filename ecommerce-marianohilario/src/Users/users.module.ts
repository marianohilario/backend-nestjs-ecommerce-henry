import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
