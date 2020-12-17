import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGlobalTable1608142941916 implements MigrationInterface {
  name = 'CreateGlobalTable1608142941916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "global" ("id" SERIAL NOT NULL, "isDown" boolean NOT NULL, "downReasonEn" character varying, "downReasonTh" character varying, "roundCount" integer NOT NULL, "phaseCount" integer NOT NULL, CONSTRAINT "PK_48e6c3f5b4e6caf50bc68644a00" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "global"`);
  }
}
