import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Request() req: Record<string, any>) {
    return this.authService.signIn(req.body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.body;
  }
}
