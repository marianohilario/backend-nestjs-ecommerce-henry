import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if(!authHeader){
        throw new UnauthorizedException('El header de autorizacion no existe')
    }
    const email = authHeader.split(',')[0]
    const password = authHeader.split(',')[1]

    if(!email || !password){
        throw new UnauthorizedException('Credencial no valida')
    }

    return true;
  }
}
