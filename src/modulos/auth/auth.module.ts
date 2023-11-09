import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsuarioModule, JwtModule.register({
    global: true,
    secret: "SEGREDO",
    signOptions: { expiresIn: "72h", },
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
