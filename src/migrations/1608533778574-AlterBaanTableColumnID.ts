import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterBaanTableColumnID1608533778574 implements MigrationInterface {
  name = 'AlterBaanTableColumnID1608533778574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "baan"."id" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "baan" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "baan_id_seq"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE "baan_id_seq" OWNED BY "baan"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "baan" ALTER COLUMN "id" SET DEFAULT nextval('baan_id_seq')`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "baan"."id" IS NULL`);
  }
}
