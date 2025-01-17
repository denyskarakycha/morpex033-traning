import { SubjectDto } from 'src/subject/dto/subject.dto';
import { UserRole } from '../enum/user-role.enum';
import { BookDto } from '../../library/dto/book.dto';
import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  public id: string;

  @IsString()
  @MinLength(5)
  @MaxLength(25)
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(26)
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
}
