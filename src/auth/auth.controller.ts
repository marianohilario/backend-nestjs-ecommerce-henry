import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { CreateUsersDto } from '../users/dtos/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
    schema: {
      example: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxYzA1NTdiLWUyYjEtNGE4OS05YWE5LTkyMjk2YzA0NTA4OCIsImVtYWlsIjoiZXhhbXBsZUBtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTcyODQxMDAyNywiZXhwIjoxNzI4NDEzNjI3fQ.eDS1ppZTma3D-JIoaX7CH3QShRoYdQfp0t4G3jOKfxQ',
        message: 'Sesión iniciada con éxito',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Missing email or password.',
    schema: {
      example: {
        message: [
          'email must be an email',
          'email should not be empty',
          'password should not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Incorrect email or password.',
  })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      example: {
        email: 'test-example@mail.com',
        name: 'Mariano',
        address: 'Calle falsa 123',
        phone: 123456789,
        country: 'Argentina',
        city: 'Buenos Aires',
        id: 'dc54165a-9abf-414f-85cc-671efca6a39f',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  signUp(@Body() userData: CreateUsersDto) {
    return this.authService.signUp(userData);
  }
}
