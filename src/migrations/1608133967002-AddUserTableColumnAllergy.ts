import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTableColumnAllergy1608133967002
  implements MigrationInterface {
  name = 'AddUserTableColumnAllergy1608133967002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "allergy" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "allergy"`);
  }
}
