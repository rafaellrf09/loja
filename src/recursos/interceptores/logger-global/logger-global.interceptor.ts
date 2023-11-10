import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from "express";
import { RequisicaoComUsuario } from 'src/modulos/auth/auth.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(
    private loggerNativo: ConsoleLogger) { }
  intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = contexto.switchToHttp()

    const requisicao = contextoHttp.getRequest<Request | RequisicaoComUsuario>();
    const instantePreControlador = Date.now();
    const resposta = contextoHttp.getResponse<Response>();
    const { path, method } = requisicao;
    return next.handle().pipe(
      tap(() => {
        const tempoDeExecucaoDaRota = Date.now() - instantePreControlador;
        if ('usuario' in requisicao) {
          this.loggerNativo.log(`Rota: {${path}, ${method}} acessada pelo usuário ${requisicao.usuario.sub} status: ${resposta.statusCode} - ${tempoDeExecucaoDaRota}ms`)
        }
      })
    );
  }
}
