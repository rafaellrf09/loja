import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested, IsNumber, IsPositive, Min, IsEmpty, MaxLength, ArrayMinSize, IsUUID } from "class-validator";
import { CaracteristicaProdutoDTO } from "./CaracteristicaProdutoDTO";
import { ImagemProdutoDTO } from "./ImagemProdutoDTO";

export class CriaProdutoDTO {
    @IsNotEmpty({
        message: "O nome tem que ser uma string de caracteres e não pode ser vazio"
    })
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @IsPositive()
    valor: number;

    @Min(0)
    quantidadeDisponivel: number;

    @IsNotEmpty({
        message: "A descricao do produto não pode ser vazia"
    })
    @MaxLength(100)
    descricao: string;

    @ValidateNested()
    @IsArray()
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];

    @IsNotEmpty({
        message: "A categoria do produto não pode ser vazia"
    })
    categoria: string;
}