import { UUID } from 'crypto';

export class JobDto {
  public id: UUID;

  public title: string;

  public responsibilities: string[];

  public requirements: string[];

  public advantages: string[];

  public companyDescription: string;

  public category: string[];

  public pubDate: Date;

  public link: string;
}
