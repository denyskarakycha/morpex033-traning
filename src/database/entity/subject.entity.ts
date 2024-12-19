import { UUID } from 'crypto';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  public id: UUID;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  public name: string;

  @ManyToOne(() => User, (user) => user.taughtSubjects)
  public teacher: User;

  @ManyToMany(() => User, (user) => user.subjects)
  public students: User[];
}
