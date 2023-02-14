import { MigrationInterface, QueryRunner } from "typeorm";

export class addCapAddressFields1676387599752 implements MigrationInterface {
  name = "addCapAddressFields1676387599752";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "cap" character varying DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "address" character varying DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "userName-unique"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "code" SET DEFAULT ' '`
    );
  }
}
