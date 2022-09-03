import { MigrationInterface, QueryRunner } from "typeorm";

export class addUniqueCodeProp1662052264312 implements MigrationInterface {
    name = 'addUniqueCodeProp1662052264312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "code" SET DEFAULT ' '`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '"2022-09-01T17:11:08.912Z"'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "userName-unique" UNIQUE ("userName", "code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "userName-unique"`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '2022-07-19 14:17:55.986'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "code" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName")`);
    }

}
