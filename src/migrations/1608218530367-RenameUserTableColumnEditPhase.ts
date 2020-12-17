import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserTableColumnEditPhase1608218530367
  implements MigrationInterface {
  name = 'RenameUserTableColumnEditPhase1608218530367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "editRound" TO "editPhase"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "editPhase" TO "editRound"`,
    );
  }
}
