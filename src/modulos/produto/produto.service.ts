import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
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

        Object.assign(produtoEntity, dadosProduto as ProdutoEntity);

        return this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        const produtosSalvos = await this.produtoRepository.find();

        return produtosSalvos;
    }

    async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
        const entityName = await this.produtoRepository.findOneBy({ id });

        if (entityName === null) throw new NotFoundException('O Produto não foi encontrado');
        
        Object.assign(entityName, novosDados as ProdutoEntity);

        await this.produtoRepository.save(entityName);
    }

    async deletaProduto(id: string) {
        const resultado = await this.produtoRepository.delete(id);

        if (!resultado.affected) {
            throw new NotFoundException('O produto não foi encontrado');
        }
    }
}