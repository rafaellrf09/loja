import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';

import { ProstgresConfigService } from './config/postgres.config.service';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: ProstgresConfigService,
      inject: [ProstgresConfigService]
    }),
    ProdutoModule,
    UsuarioModule,
    PedidoModule
  ],
  providers: [
    { 
      provide: APP_FILTER, 
      useClass: FiltroDeExcecaoGlobal,
    }
  ],
})
export class AppModule { }
