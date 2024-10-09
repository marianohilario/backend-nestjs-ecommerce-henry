import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RequestWithUserPayload } from './auth.guard';

@Injectable()
export class UserIdGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUserPayload = context.switchToHttp().getRequest();
    const userIdFromToken = request.user.id;
    const userIdFromBody = request.body.user_id;

    if (userIdFromToken !== userIdFromBody) {
      throw new ForbiddenException('User ID does not match with the token.');
    }

    return true;
  }
}
