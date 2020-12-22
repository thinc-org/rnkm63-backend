import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Global {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isDown: boolean;

  @Column({ nullable: true })
  downReasonEn: string | null;

  @Column({ nullable: true })
  downReasonTh: string | null;

  @Column()
  roundCount: number;

  @Column()
  phaseCount: number;
}
