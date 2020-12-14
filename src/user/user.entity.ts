import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  prefixname: string;

  @Column()
  realname: string;

  @Column()
  surname: string;

  @Column()
  nickname: string;

  @Column()
  religion: string;

  @Column()
  disease: string | null;

  @Column()
  allergyMedicine: string | null;

  @Column()
  usedMedicine: string | null;

  @Column()
  foodRestriction: string | null;

  @Column()
  disablity: string | null;

  @Column()
  tel: string;

  @Column()
  emergencyTel: string;

  @Column()
  emergencyTelRelationship: string;

  @Column()
  facebook: string;

  @Column()
  lineID: string;

  @Column()
  isNameWrong: boolean;

  @Column()
  isImgWrong: boolean;

  @Column()
  reason: string | null;

  @Column()
  editRound: number;

  @Column()
  isQualified: boolean;

  @Column()
  isConfirm: boolean;

  @Column()
  isTransfer: boolean;

  @Column()
  currentBaan: number | null;

  @Column()
  preferBaan: number | null;

  @Column()
  imgURL: string;
}
