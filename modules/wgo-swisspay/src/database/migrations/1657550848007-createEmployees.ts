import { MigrationInterface, QueryRunner } from "typeorm";

export class createEmployees1657550848007 implements MigrationInterface {
    name = 'createEmployees1657550848007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '"2022-07-11T14:47:30.638Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '2022-06-28 18:07:20.609'`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
