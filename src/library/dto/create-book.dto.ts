import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty({ isArray: true })
  @IsObject()
  public authors: Record<string, any>[];

  @ApiProperty({ isArray: true })
  @IsString()
  public languages: string[];

  constructor(data: any) {
    this.title = data.title;
    this.authors = data.authors;
    this.languages = data.languages;
  }
}
