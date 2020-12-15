import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBaanTable1608003456665 implements MigrationInterface {
  name = 'CreateBaanTable1608003456665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "baan" ("id" SERIAL NOT NULL, "capacity" integer NOT NULL, "memberCount" integer NOT NULL, CONSTRAINT "PK_191a2af5af06c4699531452b6fd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "baan"`);
  }
}
