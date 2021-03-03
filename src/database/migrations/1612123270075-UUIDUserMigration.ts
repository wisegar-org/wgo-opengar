import { Service } from "typedi";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

@Service()
export class UUIDUserMigration1612123270075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "uuid",
        type: "string",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "uuid");
  }
}
