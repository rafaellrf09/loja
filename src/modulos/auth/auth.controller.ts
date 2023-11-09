import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AutenticaDTO } from './dto/Autentica.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() { email, senha }: AutenticaDTO) {
    return this.authService.login(email, senha);
  }
}
