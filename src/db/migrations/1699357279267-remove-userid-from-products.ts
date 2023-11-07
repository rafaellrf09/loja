import { MigrationInterface, QueryRunner } from "typeorm";

export class removeUseridFromProducts1699357279267 implements MigrationInterface {
    name = 'removeUseridFromProducts1699357279267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "usuario_id" character varying(100)`);
    }

}
