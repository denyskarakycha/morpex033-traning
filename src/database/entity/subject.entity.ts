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
  public id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  public name: string;

  @ManyToOne(() => User, (user) => user.taughtSubjects, { onDelete: 'CASCADE' })
  public teacher: User;

  @ManyToMany(() => User, (user) => user.subjects, { onDelete: 'CASCADE' })
  public students: User[];
}
