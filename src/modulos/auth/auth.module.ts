import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsuarioModule, JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: { expiresIn: "72h", },
    }),
    inject: [ConfigService],
    global: true,
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
