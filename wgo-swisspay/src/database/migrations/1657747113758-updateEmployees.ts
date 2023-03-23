import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEmployees1657747113758 implements MigrationInterface {
  name = 'updateEmployees1657747113758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employees" ADD "enterprise_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "client_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_a9f13e18d0f16d9963546f5b525" FOREIGN KEY ("enterprise_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_66910c68073ee5ab9b47ac04941" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_66910c68073ee5ab9b47ac04941"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_a9f13e18d0f16d9963546f5b525"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "client_id"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "enterprise_id"`);
  }
}
