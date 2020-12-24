import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditAssignmentLogTable1608826151457 implements MigrationInterface {
  name = 'EditAssignmentLogTable1608826151457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assignment_log" DROP COLUMN "currentBaan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignment_log" DROP COLUMN "result"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignment_log" ADD "fromBaan" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assignment_log" DROP COLUMN "fromBaan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignment_log" ADD "result" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignment_log" ADD "currentBaan" integer`,
    );
  }
}
