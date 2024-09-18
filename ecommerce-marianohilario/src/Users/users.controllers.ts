import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { validateUserData } from '../utils/validate';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enum/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Omit<User, 'password'>[]> {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.userService.getUsers(pageNumber, limitNumber);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Partial<User>> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dataToUpdate: Partial<User>,
  ): Promise<string> {
    if (validateUserData(dataToUpdate)) {
      return await this.userService.updateUser(id, dataToUpdate);
    } else {
      return 'Usuario no valido';
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
