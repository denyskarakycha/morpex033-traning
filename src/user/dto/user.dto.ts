import { SubjectDto } from 'src/subject/dto/subject.dto';
import { UserRole } from '../enum/user-role.enum';
import { User } from 'src/database/entity/user.entity';
import { BookDto } from '../../library/dto/book.dto';
import { Optional } from '@nestjs/common';
import { IsNumber, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  public id: string;

  public name: string;

  public email: string;

  public password: string;

  @IsNumber()
  public age: number;

  public role: UserRole;

  @Optional()
  public taughtSubjects: SubjectDto[];

  @Optional()
  public subjects: SubjectDto[];

  @Optional()
  public books: BookDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.age = user.age;
    this.role = user.role;
    this.taughtSubjects = user.taughtSubjects;
    this.subjects = user.subjects;
    this.books = user.books;
  }
}
