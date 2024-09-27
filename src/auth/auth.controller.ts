import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { CreateUsersDto } from '../users/dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  signUp(@Body() userData: CreateUsersDto) {
    return this.authService.signUp(userData);
  }
}
