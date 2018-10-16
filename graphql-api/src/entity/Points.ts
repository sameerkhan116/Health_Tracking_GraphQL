import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Points {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column() exercise: Number;

  @Column() diet: Number;

  @Column() alcohol: number;

  @Column() notes: String;

  @ManyToOne(() => User, user => user.points, { cascade: ['insert'] })
  user: User | null;
}
