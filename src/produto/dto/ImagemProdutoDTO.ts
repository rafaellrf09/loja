import { IsNotEmpty, IsUrl, MaxLength } from "class-validator";
import { ProdutoEntity } from "../produto.entity";

export class ImagemProdutoDTO {
    id: string;

    @IsUrl(undefined, { message: 'URL para imagem inválida' })
    url: string;
    
    @IsNotEmpty({
        message: "A descricao da imagem não pode ser vazia"
    })
    @MaxLength(100, {
        message: "A descricao da imagem nao pode ter mais de 100 caracteres"
    })
    descricao: string;

    produto: ProdutoEntity;
}