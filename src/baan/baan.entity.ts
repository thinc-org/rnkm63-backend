import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Baan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  @Column()
  memberCount: number;
}
