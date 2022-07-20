import { MigrationInterface, QueryRunner } from "typeorm";

export class renameTypeSettings1658240270133 implements MigrationInterface {
    name = 'renameTypeSettings1658240270133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" RENAME COLUMN "type" TO "type_settings"`);
        await queryRunner.query(`ALTER TABLE "settings" RENAME CONSTRAINT "UQ_b99ecb7dd618e87685bdde69402" TO "UQ_3157c63aeacaa43fb16861feb5c"`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '"2022-07-19T14:17:55.986Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '2022-07-13 21:18:36.569'`);
        await queryRunner.query(`ALTER TABLE "settings" RENAME CONSTRAINT "UQ_3157c63aeacaa43fb16861feb5c" TO "UQ_b99ecb7dd618e87685bdde69402"`);
        await queryRunner.query(`ALTER TABLE "settings" RENAME COLUMN "type_settings" TO "type"`);
    }

}
