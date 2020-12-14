import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1607922710962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'uid',
            type: 'varchar',
          },
          {
            name: 'prefixname',
            type: 'varchar',
          },
          {
            name: 'realname',
            type: 'varchar',
          },
          {
            name: 'surname',
            type: 'varchar',
          },
          {
            name: 'nickname',
            type: 'varchar',
          },
          {
            name: 'religion',
            type: 'varchar',
          },
          {
            name: 'disease',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'allergyMedicine',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'usedMedicine',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'foodRestriction',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'disablity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tel',
            type: 'varchar',
          },
          {
            name: 'emergencyTel',
            type: 'varchar',
          },
          {
            name: 'emergencyTelRelationship',
            type: 'varchar',
          },
          {
            name: 'facebook',
            type: 'varchar',
          },
          {
            name: 'lineID',
            type: 'varchar',
          },
          {
            name: 'isNameWrong',
            type: 'boolean',
          },
          {
            name: 'isImgWrong',
            type: 'boolean',
          },
          {
            name: 'reason',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'editRound',
            type: 'int',
          },
          {
            name: 'isQualified',
            type: 'boolean',
          },
          {
            name: 'isConfirm',
            type: 'boolean',
          },
          {
            name: 'isTransfer',
            type: 'boolean',
          },
          {
            name: 'currentBaan',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'preferBaan',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'imgURL',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
