import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

// Extiende la interfaz Request para incluir el userPayload
export interface RequestWithUserPayload extends Request {
  user?: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUserPayload>();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Missing or not authorized token');
    }
  }
}
