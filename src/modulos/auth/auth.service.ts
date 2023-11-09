import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuarioService) { }
  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    const usuarioFoiAutenticado = await bcrypt.compare(senha, usuario.senha);
    if(!usuarioFoiAutenticado) throw new UnauthorizedException("O email ou a senha está incorreto");

    return usuarioFoiAutenticado;
  }
}
