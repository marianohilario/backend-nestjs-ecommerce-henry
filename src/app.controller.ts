import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Root')
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Hello! Visit http://localhost:3000/api for more information',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
