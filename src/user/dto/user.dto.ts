import { SubjectDto } from '../../subject/dto/subject.dto';
import { UserRole } from '../enum/user-role.enum';
import { BookDto } from '../../library/dto/book.dto';
import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsUUID()
  public id: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  public name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(26)
  public password: string;

  @ApiProperty()
  @IsNumber()
  public age: number;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({ isArray: true, type: SubjectDto, required: false })
  @Optional()
  public taughtSubjects: SubjectDto[];

  @ApiProperty({ isArray: true, type: SubjectDto, required: false })
  @Optional()
  public subjects: SubjectDto[];

  @ApiProperty({ isArray: true, type: SubjectDto, required: false })
  @Optional()
  public books: BookDto[];
}
