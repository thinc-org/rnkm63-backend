import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

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
  allergy: string | null;

  @Column({ nullable: true })
  allergyMedicine: string | null;

  @Column({ nullable: true })
  usedMedicine: string | null;

  @Column({ nullable: true })
  foodRestriction: string | null;

  @Column({ nullable: true })
  disability: string | null;

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
  editPhase: number;

  @Column()
  isQualified: boolean;

  @Column()
  isConfirm: boolean;

  @Column()
  isTransfer: boolean;

  @Column({ nullable: true })
  currentBaan: number | null;

  @Index()
  @Column({ nullable: true })
  preferBaan: number | null;

  @Column({ nullable: true })
  baanMemberID: number | null;

  @Column()
  requestedBaanChange: boolean;

  @Column()
  imgURL: string;
}
