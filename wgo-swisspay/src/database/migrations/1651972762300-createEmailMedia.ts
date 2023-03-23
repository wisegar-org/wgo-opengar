import { MigrationInterface, QueryRunner } from "typeorm";

export class createEmailMedia1651972762300 implements MigrationInterface {
    name = 'createEmailMedia1651972762300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_media" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "senderTo" character varying NOT NULL DEFAULT '', "fileName" character varying NOT NULL DEFAULT '', "fileExt" character varying NOT NULL DEFAULT '', "fileContent" bytea NOT NULL, "isPublic" boolean NOT NULL DEFAULT false, "contentId" character varying NOT NULL DEFAULT '', "contentType" character varying NOT NULL DEFAULT '', "size" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_7cb3ed8b2fbca3b93108ef17741" UNIQUE ("contentId"), CONSTRAINT "PK_392eec890011db84ba241ae2efc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_media"`);
    }

}
