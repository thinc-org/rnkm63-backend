import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class AssignmentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 10 })
  uid: string;

  @Column({ nullable: true })
  currentBaan: number | null;

  @Column({ nullable: true })
  preferBaan: number | null;

  @Column()
  round: number;

  @Column()
  result: boolean;
}
