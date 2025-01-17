import { Optional } from '@nestjs/common';
import { User } from '../../database/entity/user.entity';
import { IsUUID } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
import { SubjectDto } from '../../subject/dto/subject.dto';
import { BookDto } from '../../library/dto/book.dto';

export class ResponseUserDto {
  @IsUUID()
  public id: string;

  public name: string;

  public email: string;

  public password: string;

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
