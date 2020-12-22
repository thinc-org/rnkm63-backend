import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Baan {
  @PrimaryColumn()
  id: number;

  @Column()
  capacity: number;

  @Column()
  memberCount: number;
}
