import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
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

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  private trataDadosDoPedido(dadosDoPedido: CriaPedidoDTO, produtosRelacionados: ProdutoEntity[]) {
    dadosDoPedido.itensPedido.forEach(itemPedido => {
      const produtoRelacionado = produtosRelacionados.find(produto => produto.id === itemPedido.produtoId);
      if (!produtoRelacionado)
        throw new NotFoundException(`O produto com id: ${itemPedido.produtoId} não foi encontrado`);

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel)
        throw new BadRequestException(`a quantidade solicidada: (${itemPedido.quantidade}) é maior que a disponível: (${produtoRelacionado.quantidadeDisponivel}) do produto '${produtoRelacionado.nome}'`);
    });

  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);
    const produtosIds = dadosDoPedido.itensPedido.map(itemPedido => itemPedido.produtoId);

    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) });

    const pedidoEntity = new PedidoEntity();

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itemsPedidoEntidades = dadosDoPedido.itensPedido.map(itemPedido => {
      const produtoRelacionado = produtosRelacionados.find(produto => produto.id === itemPedido.produtoId);



      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
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

  async update(id: string, updatePedidoDto: AtualizaPedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (!pedido) throw new NotFoundException('O Produto não foi encontrado');

    Object.assign(pedido, updatePedidoDto);

    await this.pedidoRepository.save(pedido);
  }

  async remove(id: string) {
    return this.pedidoRepository.delete(id);
  }

  async obtemPedidosDeUsuario(id: string) {
    const usuario = await this.buscaUsuario(id);

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
