import { Injectable } from '@nestjs/common';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './item-pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) { }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const produtosIds = dadosDoPedido.itensPedido.map(itemPedido => itemPedido.produtoId);

    const produtosRelacionados = await this.produtoRepository.findBy({id: In(produtosIds)});

    const pedidoEntity = new PedidoEntity();

    const itemsPedidoEntidades = dadosDoPedido.itensPedido.map(itemPedido => {
      const produtoRelacionado = produtosRelacionados.find(produto => produto.id === itemPedido.produtoId);
      
      const itemPedidoEntity = new ItemPedidoEntity();
      
      itemPedidoEntity.produto = produtoRelacionado;
      itemPedidoEntity.precoVenda = produtoRelacionado.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;

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
