import { MigrationInterface, QueryRunner } from "typeorm";

export class addCertificateFields1656434163078 implements MigrationInterface {
    name = 'addCertificateFields1656434163078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "certificate" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "code" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '"2022-06-28T16:36:06.386Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '2022-06-23 19:27:06.179'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "certificate"`);
    }

}
