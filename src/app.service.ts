import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! Visit http://localhost:3000/api for more information';
  }
}
