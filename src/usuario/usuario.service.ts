import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async criaUsuario(usuarioEntity: UsuarioEntity) {
        await this.usuarioRepository.save(usuarioEntity);
    }

    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista = usuariosSalvos.map(usuario => {
            return new ListaUsuarioDTO(usuario.id, usuario.nome)
        })

        return usuariosLista;
    }

    async atualizaUsuario(id: string, usuarionEntity: AtualizaUsuarioDTO) {
        await this.usuarioRepository.update(id, usuarionEntity);
    }

    async deletaUsuario(id: string) {
        await this.usuarioRepository.delete(id);
    }
}