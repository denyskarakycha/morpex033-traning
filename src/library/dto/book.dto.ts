import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class BookDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty({ isArray: true })
  public authors: Record<string, any>[];

  @ApiProperty({ isArray: true })
  public languages: string[];

  @ApiProperty({ type: Date })
  public takenAt: Date | null;

  @ApiProperty({ type: Date })
  public returnBy: Date | null;

  @ApiProperty({ type: UserDto })
  public takenBy: UserDto | null;

  constructor(book: any) {
    this.id = book.id;
    this.title = book.title;
    this.authors = book.authors;
    this.languages = book.languages;
    this.takenAt = book.takenAt;
    this.returnBy = book.returnBy;
    this.takenBy = book.takenBy;
  }
}
