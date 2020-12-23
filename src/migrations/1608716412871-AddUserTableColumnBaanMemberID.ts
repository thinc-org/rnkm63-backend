import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTableColumnBaanMemberID1608716412871
  implements MigrationInterface {
  name = 'AddUserTableColumnBaanMemberID1608716412871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "baanMemberID" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "baanMemberID"`);
  }
}
