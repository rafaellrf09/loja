import { IsNotEmpty, MaxLength } from "class-validator";
import { ProdutoEntity } from "../produto.entity";

export class CaracteristicaProdutoDTO {
  id: string;
  
  @IsNotEmpty()
  nome: string;
  @IsNotEmpty()
  @MaxLength(100)
  descricao: string;

  produto: ProdutoEntity;
}