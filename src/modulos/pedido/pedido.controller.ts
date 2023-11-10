import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import { AuthGuard, RequisicaoComUsuario } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) { }

  @Post()
  create(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CriaPedidoDTO
  ) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.cadastraPedido(
      usuarioId, dadosDoPedido
    );
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Req() req: RequisicaoComUsuario,
  //   @Param('id') id: string,
  //   @Body() updatePedidoDto: AtualizaPedidoDTO
  // ) {
  //   const usuarioId = req.usuario.sub;
  //   return this.pedidoService.update(id, updatePedidoDto, usuarioId);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(id);
  }

  @Get()
  async obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);

    return pedidos;
  }

}
