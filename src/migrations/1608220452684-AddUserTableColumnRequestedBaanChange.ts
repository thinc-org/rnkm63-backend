import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTableColumnRequestedBaanChange1608220452684
  implements MigrationInterface {
  name = 'AddUserTableColumnRequestedBaanChange1608220452684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "requestedBaanChange" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "requestedBaanChange"`,
    );
  }
}
