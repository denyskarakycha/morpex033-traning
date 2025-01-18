import { ApiProperty } from '@nestjs/swagger';
import { Job } from '../../database/entity/job.entity';

export class JobDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty({ isArray: true })
  public responsibilities: string[];

  @ApiProperty()
  public description: string;

  @ApiProperty({ isArray: true })
  public category: string[];

  @ApiProperty({ type: Date })
  public pubDate: Date;

  @ApiProperty()
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
