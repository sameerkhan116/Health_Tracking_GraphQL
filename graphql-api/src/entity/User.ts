import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Points } from './Points';

@Entity()
export class User {
  @PrimaryColumn() id: number;

  @Column() firstName: string;

  @Column() lastName: string;

  @OneToMany(() => Points, points => points.user)
  points: Points[];
}
