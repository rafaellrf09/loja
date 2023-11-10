import { MigrationInterface, QueryRunner } from "typeorm";

export class criandoCampoDeComentarioPedido1699628668115 implements MigrationInterface {
    name = 'criandoCampoDeComentarioPedido1699628668115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "comentario" character varying(250)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "comentario"`);
    }

}
