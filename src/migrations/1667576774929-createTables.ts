import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667576774929 implements MigrationInterface {
    name = 'createTables1667576774929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_dc7c369d193aa998e9f399d5575"`);
        await queryRunner.query(`ALTER TABLE "users_games" RENAME COLUMN "userId" TO "usersId"`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_71c23e6f2a7bb6191339d0ff876" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_71c23e6f2a7bb6191339d0ff876"`);
        await queryRunner.query(`ALTER TABLE "users_games" RENAME COLUMN "usersId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_dc7c369d193aa998e9f399d5575" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
