import { IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { EmailUnico } from "../validacao/emailUnico.validator";

export class CriaUsuarioDTO {
    @IsNotEmpty({
        message: "O nome tem que ser uma string de caracteres e não pode ser vazio"
    })
    nome: string;

    @IsEmail(undefined, {
        message: "O email informado é inválido"
    })
    @EmailUnico({
        message: "Já existe um usuario com este email"
    })
    email: string;
    
    @MinLength(6, {
        message: "A senha precisa ter pelo menos 6 caracteres"
    })
    senha: string;
}