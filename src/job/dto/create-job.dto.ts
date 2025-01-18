import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty({ isArray: true })
  public category: string[];

  @ApiProperty({ type: Date })
  public pubDate: Date;

  @ApiProperty()
  public link: string;

  constructor(data: any, description: string) {
    this.title = data.title;
    this.description = description;
    this.category = data.category;
    this.pubDate = data.pubDate;
    this.link = data.link;
  }
}
