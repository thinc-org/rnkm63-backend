import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1607966588779 implements MigrationInterface {
  name = 'CreateUserTable1607966588779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "uid" character varying(10) NOT NULL, "prefixname" character varying NOT NULL, "realname" character varying NOT NULL, "surname" character varying NOT NULL, "nickname" character varying NOT NULL, "religion" character varying NOT NULL, "disease" character varying, "allergyMedicine" character varying, "usedMedicine" character varying, "foodRestriction" character varying, "disablity" character varying, "tel" character varying NOT NULL, "emergencyTel" character varying NOT NULL, "emergencyTelRelationship" character varying NOT NULL, "facebook" character varying NOT NULL, "lineID" character varying NOT NULL, "isNameWrong" boolean NOT NULL, "isImgWrong" boolean NOT NULL, "reason" character varying, "editRound" integer NOT NULL, "isQualified" boolean NOT NULL, "isConfirm" boolean NOT NULL, "isTransfer" boolean NOT NULL, "currentBaan" integer, "preferBaan" integer, "imgURL" character varying NOT NULL, CONSTRAINT "UQ_df955cae05f17b2bcf5045cc021" UNIQUE ("uid"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
