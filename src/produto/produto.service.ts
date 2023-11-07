import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { ListaProdutoDTO } from "./dto/ListaProdutoDTO";
import { AtualizaProdutoDTO } from "./dto/AtualizaProdutoDTO";
import { CriaProdutoDTO } from "./dto/CriaProdutoDTO";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) { }

    async criaProduto(dadosProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        produtoEntity.nome = dadosProduto.nome;
        produtoEntity.usuarioId = dadosProduto.usuarioId;
        produtoEntity.valor = dadosProduto.valor;
        produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
        produtoEntity.descricao = dadosProduto.descricao;
        produtoEntity.categoria = dadosProduto.categoria;
        produtoEntity.caracteristicas = dadosProduto.caracteristicas;
        produtoEntity.imagens = dadosProduto.imagens;

        return this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        const produtosSalvos = await this.produtoRepository.find();
        // const produtosLista = produtosSalvos.map(produto => {
        //     return new ListaProdutoDTO(produto.id, produto.nome)
        // })

        // return produtosLista;
    }

    async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
        await this.produtoRepository.update(id, produtoEntity);
    }

    async deletaProduto(id: string) {
        await this.produtoRepository.delete(id);
    }
}