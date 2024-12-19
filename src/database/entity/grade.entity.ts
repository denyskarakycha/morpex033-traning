import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';
import { Max, Min } from 'class-validator';

@Entity('grade')
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, (user) => user.id)
  public student: User;

  @ManyToOne(() => Subject, (subject) => subject.id)
  public subject: Subject;

  @Column({ name: 'grade', type: 'int' })
  @Min(0)
  @Max(100)
  public grade: number;

  @Column({
    name: 'date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public date: Date;
}
