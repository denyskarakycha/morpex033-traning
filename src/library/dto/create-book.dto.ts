import { IsObject, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public title: string;

  @IsObject()
  public authors: Record<string, any>;

  @IsString()
  public languages: string[];

  constructor(data: any) {
    this.title = data.title;
    this.authors = data.authors;
    this.languages = data.languages;
  }
}
