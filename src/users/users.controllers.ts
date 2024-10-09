import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number to display.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of users to display per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Users list.',
    schema: {
      example: [
        {
          id: '748d31a6-5a6f-4647-afad-b0d7ff271f85',
          name: 'Jack Sparrow',
          email: 'jack@example.com',
          phone: 1234567890,
          country: 'United States',
          address: 'lila address correct',
          city: 'New York',
        },
        {
          id: 'a1b2c3d4-5e6f-7890-abcd-ef1234567890',
          name: 'John Doe',
          email: 'john@example.com',
          phone: 9876543210,
          country: 'Canada',
          address: '123 Maple Street',
          city: 'Toronto',
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden! Only admins can perform this action.',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Omit<User, 'password' | 'isAdmin'>[]> {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.userService.getUsers(pageNumber, limitNumber);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'User ID',
    example: 'c1982490-e6a6-464f-8cb8-4c1d42ed6031',
  })
  @ApiResponse({
    status: 200,
    description: 'User detail.',
    schema: {
      example: [
        {
          id: '748d31a6-5a6f-4647-afad-b0d7ff271f85',
          email: 'jack@example.com',
          name: 'Jack Sparrow',
          address: 'lila address correct',
          phone: 1234567890,
          country: 'United States',
          city: 'New York',
          orders: [
            {
              id: '084692d1-8b58-483b-8e71-a36b49731739',
              date: '2024-09-18T22:33:40.060Z',
            },
            {
              id: '15aaae38-6b62-4d9d-95ca-e1db7af558b8',
              date: '2024-09-19T17:02:26.495Z',
            },
          ],
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Partial<User>> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'User ID',
    example: '01c0557b-e2b1-4a89-9aa9-92296c045088',
  })
  @ApiBody({
    description: 'Must contain at least one of the following fields:',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the id of the user who has been updated',
    example:
      "User with ID: '748d31a6-5a6f-4647-afad-b0d7ff271f85' has been deleted successfully.",
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dataToUpdate: UpdateUserDto,
  ): Promise<string> {
    if (validateUserData(dataToUpdate)) {
      return await this.userService.updateUser(id, dataToUpdate);
    } else {
      return 'Invalid user';
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'User ID',
    example: '748d31a6-5a6f-4647-afad-b0d7ff271f85',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the id of the user who has been deleted',
    example:
      "User with ID: '748d31a6-5a6f-4647-afad-b0d7ff271f85' has been deleted successfully.",
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Missing or not authorized token' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
