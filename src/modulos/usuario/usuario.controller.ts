import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashPassword } from '../../recursos/pipes/hash-password.pipe';

@Controller('/usuarios')
export class UsuarioController {
    constructor(
        private usuarioRepository: UsuarioRepository,
        private usuarioService: UsuarioService
    ) { }

    @Post()
    async criaUsuario(
        @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
        @Body("senha", HashPassword) senhaHasheada: string
    ) {
        const usuarioCriado = await this.usuarioService.criaUsuario({ ...dadosDoUsuario, senha: senhaHasheada });

        return {
            usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
            messagem: 'usuário criado com sucesso',
        };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioService.listaUsuarios();
        return usuariosSalvos;
    }

    @Put("/:id")
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);

        return usuarioAtualizado;
    }

    @Delete("/:id")
    async removeUsuario(@Param("id") id: string) {
        const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

        return usuarioRemovido;
    }
};
