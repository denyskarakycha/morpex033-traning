import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  public id: UUID;

  @Column({ type: 'varchar', name: 'title' })
  public title: string;

  @Column({ type: 'jsonb', name: 'author' })
  public authors: Record<string, any>[];

  @Column({ type: 'varchar', name: 'languages' })
  public languages: string[];

  @Column({ type: 'timestamp', nullable: true, name: 'takenAt' })
  public takenAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, name: 'returnBy' })
  public returnBy: Date | null;

  @ManyToOne(() => User, (user) => user.books, { nullable: true, eager: true })
  @JoinTable()
  public takenBy: User | null;
}
