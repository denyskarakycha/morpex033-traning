import { Optional } from '@nestjs/common';
import { User } from '../../database/entity/user.entity';
import { IsUUID } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
import { SubjectDto } from '../../subject/dto/subject.dto';
import { BookDto } from '../../library/dto/book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  @IsUUID()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public age: number;

  @ApiProperty({ enum: UserRole })
  public role: UserRole;

  @ApiProperty({ isArray: true, type: SubjectDto, required: false })
  @Optional()
  public taughtSubjects: SubjectDto[];

  @ApiProperty({ isArray: true, type: SubjectDto, required: false })
  @Optional()
  public subjects: SubjectDto[];

  @ApiProperty({ isArray: true, type: BookDto, required: false })
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
