import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProstgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './pedido/pedido.module';

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
})
export class AppModule { }
