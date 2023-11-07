import { Injectable } from '@nestjs/common';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './item-pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    const pedidoEntity = new PedidoEntity();

    const itemsPedidoEntidades = dadosDoPedido.itensPedido.map(itemPedido => {
      const itemPedidoEntity = new ItemPedidoEntity();
      
      itemPedidoEntity.precoVenda = 10;
      itemPedidoEntity.quantidade = itemPedido.quantidade;

      return itemPedidoEntity;
    });
    
    const valorTotal = itemsPedidoEntidades.reduce((total, item) => {
    return total + item.precoVenda * item.quantidade
  }, 0);

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;
    pedidoEntity.itensPedido = itemsPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async findAll() {
    return this.pedidoRepository.find();
  }

  async findOne(id: string) {
    return this.pedidoRepository.findBy({ id });
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  async remove(id: string) {
    return this.pedidoRepository.delete(id);
  }

  async obtemPedidosDeUsuario(id: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id },
      },
      relations: {
        usuario: true,
      },
    });
  }
}
