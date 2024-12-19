import { UUID } from 'crypto';
import { UserRole } from 'src/user/enum/user-role.enum';
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
  age: number;

  @Column({
    enum: UserRole,
  })
  role: UserRole;

  @OneToMany(() => Subject, (subject) => subject.teacher)
  taughtSubjects: Subject[];

  @ManyToMany(() => Subject, (subject) => subject.students)
  @JoinTable()
  subjects: Subject[];
}
