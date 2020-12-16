import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameMisspellingUserTableColumnDisability1608120051505
  implements MigrationInterface {
  name = 'RenameMisspellingUserTableColumnDisability1608120051505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "disablity" TO "disability"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "disability" TO "disablity"`,
    );
  }
}
