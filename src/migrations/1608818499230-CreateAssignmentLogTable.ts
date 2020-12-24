import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssignmentLogTable1608818499230
  implements MigrationInterface {
  name = 'CreateAssignmentLogTable1608818499230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "assignment_log" ("id" SERIAL NOT NULL, "uid" character varying(10) NOT NULL, "currentBaan" integer, "preferBaan" integer, "assignedBaan" integer NOT NULL, "round" integer NOT NULL, "result" boolean NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3249c3a771bb0229fab8664e56" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7568c19f4c13ee365828033775" ON "assignment_log" ("uid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_7568c19f4c13ee365828033775"`);
    await queryRunner.query(`DROP TABLE "assignment_log"`);
  }
}
