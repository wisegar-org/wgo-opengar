import { MigrationInterface, QueryRunner } from "typeorm";

export class addCasinaIndexContentDatabase1659037006696 implements MigrationInterface {
    name = 'addCasinaIndexContentDatabase1659037006696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "casina_module_entity" ("id" SERIAL NOT NULL, "imageId" integer, CONSTRAINT "PK_637cd1df3cb570f4f065c9c8fe7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "casina_module_entity" ADD CONSTRAINT "FK_364f3ee8026aaa1e20c1c6a94bb" FOREIGN KEY ("imageId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "casina_module_entity" DROP CONSTRAINT "FK_364f3ee8026aaa1e20c1c6a94bb"`);
        await queryRunner.query(`DROP TABLE "casina_module_entity"`);
    }

}
