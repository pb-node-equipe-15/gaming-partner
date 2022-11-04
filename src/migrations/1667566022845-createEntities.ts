import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntities1667566022845 implements MigrationInterface {
    name = 'createEntities1667566022845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_b03e5a5ef0897d70fef304577a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "availability" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "gamesId" uuid, CONSTRAINT "PK_7373732a33c22813c5e06f4b4c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoriesId" uuid, CONSTRAINT "PK_1950492f583d31609c5e9fbbe12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "conections" ADD CONSTRAINT "FK_2542399e65954adcc74393d0f32" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_dc7c369d193aa998e9f399d5575" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_games" ADD CONSTRAINT "FK_a6ba7a3211086aca0270901dd3b" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Games" ADD CONSTRAINT "FK_858713f204c683536e0d17f9c3e" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Games" DROP CONSTRAINT "FK_858713f204c683536e0d17f9c3e"`);
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_a6ba7a3211086aca0270901dd3b"`);
        await queryRunner.query(`ALTER TABLE "users_games" DROP CONSTRAINT "FK_dc7c369d193aa998e9f399d5575"`);
        await queryRunner.query(`ALTER TABLE "conections" DROP CONSTRAINT "FK_2542399e65954adcc74393d0f32"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "Games"`);
        await queryRunner.query(`DROP TABLE "users_games"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "conections"`);
    }

}
