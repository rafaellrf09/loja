import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsuarioPayloadJWT } from './auth.service';

export interface RequisicaoComUsuario extends Request{
  usuario: UsuarioPayloadJWT;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async canActivate(
    contexto: ExecutionContext,
  ): Promise<boolean> {
    const requisicao = contexto.switchToHttp().getRequest<RequisicaoComUsuario>();
    const token = this.extrairTokenDoCabecalho(requisicao);
    if (!token) throw new UnauthorizedException("Erro de autenticação");

    try {
      const payload: UsuarioPayloadJWT = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException("JWT Inválido");
    }

    return true;
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    const [tipo, token] = requisicao.headers.authorization?.split(" ") ?? [];
    return tipo === "Bearer" ? token : undefined;
  }
}
