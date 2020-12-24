import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class AssignmentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 10 })
  uid: string;

  @Column()
  fromBaan: number;

  @Column({ nullable: true })
  preferBaan: number | null;

  @Column()
  assignedBaan: number;

  @Column()
  round: number;

  @CreateDateColumn()
  createAt: number;
}
