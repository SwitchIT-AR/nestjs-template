import { EntityManager } from '@mikro-orm/postgresql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Provider,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { Session } from './domain/session.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly em: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const sessionId = request.cookies.sid;
    if (typeof sessionId === 'undefined') throw new UnauthorizedException();

    const session = await this.em.findOne(Session, { id: sessionId });
    if (session === null || session.expireAt < new Date()) {
      response.clearCookie('sid');
      throw new UnauthorizedException();
    }

    request.session = session;
    return true;
  }
}

export const AuthGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

declare module 'express' {
  interface Request {
    session: Session;
  }
}
