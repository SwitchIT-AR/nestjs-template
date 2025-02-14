import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Session = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    if (typeof request.session === 'undefined')
      throw new Error('@Session() called with undefined req.session');
    return request.session;
  },
);
