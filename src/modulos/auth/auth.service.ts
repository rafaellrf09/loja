import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

interface UsuarioPayloadJWT {
  sub: string,
  nomeUsuario: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) { }
  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    const usuarioFoiAutenticado = await bcrypt.compare(senha, usuario.senha);
    if (!usuarioFoiAutenticado) throw new UnauthorizedException("O email ou a senha está incorreto");

    const payload: UsuarioPayloadJWT = {
      sub: usuario.id,
      nomeUsuario: usuario.nome,
    }

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
