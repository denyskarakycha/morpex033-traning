import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'category', type: 'jsonb' })
  public category: string[];

  @Column({ type: 'timestamp', name: 'pubDate' })
  public pubDate: Date;

  @Column({ name: 'remoteWorkFormat' })
  public link: string;
}
