import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProstgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsuarioModule,
    ProdutoModule,
    TypeOrmModule.forRootAsync({
      useClass: ProstgresConfigService,
      inject: [ProstgresConfigService]
    })
  ],
})
export class AppModule { }
