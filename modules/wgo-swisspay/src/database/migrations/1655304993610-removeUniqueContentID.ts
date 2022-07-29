import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeUniqueContentID1655304993610 implements MigrationInterface {
  name = 'removeUniqueContentID1655304993610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "email_media" DROP CONSTRAINT "UQ_7cb3ed8b2fbca3b93108ef17741"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_media" ADD CONSTRAINT "UQ_7cb3ed8b2fbca3b93108ef17741" UNIQUE ("contentId")`
    );
  }
}
