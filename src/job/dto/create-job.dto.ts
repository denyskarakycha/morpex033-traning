

export class CreateJobDto {
  public title: string;

  public description: string;

  public category: string[];

  public pubDate: Date;

  public link: string;

  constructor(data: any, description: string) {
    this.title = data.title;
    this.description = description;
    this.category = data.category;
    this.pubDate = data.pubDate;
    this.link = data.link;
  }
}
