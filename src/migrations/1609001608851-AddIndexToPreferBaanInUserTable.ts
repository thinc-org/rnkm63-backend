import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexToPreferBaanInUserTable1609001608851
  implements MigrationInterface {
  name = 'AddIndexToPreferBaanInUserTable1609001608851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_a06b7ddce044f7ad3f4b404128" ON "user" ("preferBaan") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_a06b7ddce044f7ad3f4b404128"`);
  }
}
