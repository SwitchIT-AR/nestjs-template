import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ZodPipe } from '../common/zod.pipe';
import { AuthService } from './auth.service';
import { LoginData, loginDataSchema } from './schemas/login-data.schema';

@Controller()
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async logIn(
    @Body(new ZodPipe(loginDataSchema)) data: LoginData,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.authService.login(data);
    response.cookie('sid', session.id, {
      expires: session.expireAt,
      httpOnly: true,
      sameSite: 'lax',
      secure: this.configService.get('NODE_ENV') === 'production',
    });
  }
}
