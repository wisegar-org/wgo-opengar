import { MigrationInterface, QueryRunner } from "typeorm";

export class addSettingsEntity1658164004212 implements MigrationInterface {
    name = 'addSettingsEntity1658164004212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "type" character varying NOT NULL DEFAULT '', "settings" json NOT NULL DEFAULT '{}', CONSTRAINT "UQ_b99ecb7dd618e87685bdde69402" UNIQUE ("type"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '"2022-07-18T17:06:52.734Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '2022-07-11 14:47:30.638'`);
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
