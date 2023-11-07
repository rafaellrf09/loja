import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProdutoDTO';
import { ProdutoEntity } from './produto.entity';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from './dto/AtualizaProdutoDTO';
import { ProdutoService } from './produto.service';


@Controller('/produtos')
export class ProdutoController {
    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly produtoService: ProdutoService
    ) { }

    @Post()
    async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
        const produtoCadastrado = await this.produtoService.criaProduto(
            dadosProduto,
        );

        return {
            mensagem: 'Produto criado com sucesso.',
            produto: produtoCadastrado,
        };
    }

    @Get()
    async listaTodos() {
        return this.produtoRepository.listar();
    }

    @Put('/:id')
    async atualiza(
        @Param('id') id: string,
        @Body() dadosProduto: AtualizaProdutoDTO,
    ) {
        const produtoAlterado = await this.produtoRepository.atualiza(
            id,
            dadosProduto,
        );

        return {
            mensagem: 'produto atualizado com sucesso',
            produto: produtoAlterado,
        };
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const produtoRemovido = await this.produtoRepository.remove(id);

        return {
            mensagem: 'produto removido com sucesso',
            produto: produtoRemovido,
        };
    }
};