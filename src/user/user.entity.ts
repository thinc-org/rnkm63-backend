import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
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

  @Column({ nullable: true })
  disease: string | null;

  @Column({ nullable: true })
  allergyMedicine: string | null;

  @Column({ nullable: true })
  usedMedicine: string | null;

  @Column({ nullable: true })
  foodRestriction: string | null;

  @Column({ nullable: true })
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

  @Column({ nullable: true })
  reason: string | null;

  @Column()
  editRound: number;

  @Column()
  isQualified: boolean;

  @Column()
  isConfirm: boolean;

  @Column()
  isTransfer: boolean;

  @Column({ nullable: true })
  currentBaan: number | null;

  @Column({ nullable: true })
  preferBaan: number | null;

  @Column()
  imgURL: string;
}
