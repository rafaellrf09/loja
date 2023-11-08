import { PartialType } from "@nestjs/mapped-types";
import { CriaProdutoDTO } from "./CriaProdutoDTO";

export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) {}