import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

import { ProstgresConfigService } from './config/postgres.config.service';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';

import { ProdutoModule } from './modulos/produto/produto.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10000 }),
      }),
      isGlobal: true,

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
