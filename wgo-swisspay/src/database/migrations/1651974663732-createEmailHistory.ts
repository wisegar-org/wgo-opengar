import { MigrationInterface, QueryRunner } from "typeorm";

export class createEmailHistory1651974663732 implements MigrationInterface {
    name = 'createEmailHistory1651974663732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_history" ("id" SERIAL NOT NULL, "from" character varying NOT NULL DEFAULT '', "to" character varying NOT NULL DEFAULT '', "cc" character varying NOT NULL DEFAULT '', "bcc" character varying NOT NULL DEFAULT '', "subject" character varying NOT NULL DEFAULT '', "headers" character varying NOT NULL DEFAULT '', "date" TIMESTAMP NOT NULL DEFAULT '"2022-05-08T01:51:05.806Z"', "messageId" character varying NOT NULL DEFAULT '', "inReplyTo" character varying NOT NULL DEFAULT '', "replyTo" character varying NOT NULL DEFAULT '', "references" character varying NOT NULL DEFAULT '', "html" character varying NOT NULL DEFAULT '', "text" character varying NOT NULL DEFAULT '', "textAsHtml" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_abbda109218969deb4e9c90ac99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_history"`);
    }

}
