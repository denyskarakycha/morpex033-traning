import { UUID } from 'crypto';
import { UserRole } from '../../user/enum/user-role.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  public password: string;

  @Column('int')
  public age: number;

  @Column({
    enum: UserRole,
  })
  public role: UserRole;

  @OneToMany(() => Subject, (subject) => subject.teacher)
  public taughtSubjects: Subject[];

  @ManyToMany(() => Subject, (subject) => subject.students)
  @JoinTable()
  public subjects: Subject[];
}
