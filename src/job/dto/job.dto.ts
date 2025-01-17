import { UUID } from 'crypto';
import { Job } from '../../database/entity/job.entity';

export class JobDto {
  public id: string;

  public title: string;

  public responsibilities: string[];

  public description: string;

  public category: string[];

  public pubDate: Date;

  public link: string;

  constructor(job: Job) {
    this.id = job.id;
    this.title = job.title;
    this.description = job.description;
    this.category = job.category;
    this.pubDate = job.pubDate;
    this.link = job.link;
  }
}
