import { MigrationInterface, QueryRunner } from "typeorm";

export class tttt1667871128763 implements MigrationInterface {
    name = 'tttt1667871128763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conections" DROP CONSTRAINT "FK_303806d2cfabc319b77e92fb5a5"`);
        await queryRunner.query(`ALTER TABLE "conections" RENAME COLUMN "conetionsId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "conections" ADD CONSTRAINT "FK_2542399e65954adcc74393d0f32" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conections" DROP CONSTRAINT "FK_2542399e65954adcc74393d0f32"`);
        await queryRunner.query(`ALTER TABLE "conections" RENAME COLUMN "userId" TO "conetionsId"`);
        await queryRunner.query(`ALTER TABLE "conections" ADD CONSTRAINT "FK_303806d2cfabc319b77e92fb5a5" FOREIGN KEY ("conetionsId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
