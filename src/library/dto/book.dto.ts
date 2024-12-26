import { UUID } from 'crypto';
import { UserDto } from '../../user/dto/user.dto';

export class BookDto {
  public id: UUID;

  public title: string;

  public authors: Record<string, any>;

  public languages: string[];

  public takenAt: Date | null;

  public returnBy: Date | null;

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
