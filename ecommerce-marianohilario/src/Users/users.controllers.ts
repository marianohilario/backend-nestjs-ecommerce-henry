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
import { validateUserData } from 'src/utils/validate';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUsersDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Omit<User, 'password'>[]> {
    return this.userService.getUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() userData: CreateUsersDto): Promise<string> | string {
    // if (validateUserData(userData, true)) { //! Comentado para validar los pipes, como se modificaron los tipos debo modificar la función validateUserData
    return this.userService.createUser(userData);
    // } else {
    // return 'Usuario no valido';
    // }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dataToUpdate: User,
  ): Promise<string> | string {
    if (validateUserData(dataToUpdate)) {
      return this.userService.updateUser(id, dataToUpdate);
    } else {
      return 'Usuario no valido';
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
