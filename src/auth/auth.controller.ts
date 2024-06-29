import { Body, Controller, HttpCode, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  async register(@Req() req: string, @Body() authDto: AuthDto) {
    return this.authService.register(req, authDto);
  }

  @HttpCode(201)
  @Post('login')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @HttpCode(201)
  @Post('forgot-password')
  async forgotPassword(@Query('email') email: string) {
    return this.authService.forgotPassword(email);
  }
}
