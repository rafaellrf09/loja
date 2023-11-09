import { Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashPassword implements PipeTransform {
    constructor(private configService: ConfigService) { }
    async transform(senha: string) {
        const sal = this.configService.get<string>("SAL_PASSWORD");

        const senhaHasheada = await bcrypt.hash(senha, sal!);
        return senhaHasheada;
    }

}