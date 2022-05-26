import { MigrationInterface, QueryRunner } from "typeorm";

export class createEmailMediaRelation1651975332815 implements MigrationInterface {
    name = 'createEmailMediaRelation1651975332815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_media" ADD "emailId" integer`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '"2022-05-08T02:02:14.947Z"'`);
        await queryRunner.query(`ALTER TABLE "email_media" ADD CONSTRAINT "FK_64ec84c630ee9d638ee999a0f00" FOREIGN KEY ("emailId") REFERENCES "email_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_media" DROP CONSTRAINT "FK_64ec84c630ee9d638ee999a0f00"`);
        await queryRunner.query(`ALTER TABLE "email_history" ALTER COLUMN "date" SET DEFAULT '2022-05-08 01:51:05.806'`);
        await queryRunner.query(`ALTER TABLE "email_media" DROP COLUMN "emailId"`);
    }

}
