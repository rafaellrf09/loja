import { IsEmail, IsNotEmpty } from "class-validator";

export class AutenticaDTO {
    @IsEmail(undefined, {message: "o e-mail informado é inválido"})
    email: string;
    @IsNotEmpty({ message: "a senha não pode estar vazia" })
    senha: string;
}
