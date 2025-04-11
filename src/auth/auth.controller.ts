import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ZodPipe } from '../common/zod.pipe';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Session } from './decorators/session.decorator';
import { Session as SessionEntity } from './domain/session.entity';
import { LoginData, loginDataSchema } from './schemas/login-data.schema';

@Controller()
export class AuthController {
  private readonly useSecureCookies: boolean;

  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    this.useSecureCookies = configService.get('NODE_ENV') === 'production';
  }

  @Public()
  @Post('login')
  async login(
    @Body(new ZodPipe(loginDataSchema)) data: LoginData,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.authService.login(data);
    response.cookie('sid', session.id, {
      secure: this.useSecureCookies,
      expires: session.expireAt,
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  @Get('user')
  async getCurrentUser(@Session() session: SessionEntity) {
    return this.authService.getCurrentUser(session);
  }

  @Post('logout')
  async logout(
    @Session() session: SessionEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(session);
    response.clearCookie('sid');
  }
}
