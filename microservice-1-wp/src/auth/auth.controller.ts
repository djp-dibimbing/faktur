import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { npwp: string; password: string }) {
    return this.authService.login(body);
  }

  @Post('validate')
  validate(@Body() body: { token: string }) {
    return this.authService.validateToken(body.token);
  }
}
