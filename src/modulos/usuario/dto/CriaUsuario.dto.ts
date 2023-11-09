import { IsEmail, MinLength, IsNotEmpty, Matches } from "class-validator";
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

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
        message: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
    })
    @MinLength(6, {
        message: "A senha precisa ter pelo menos 6 caracteres"
    })
    senha: string;
}