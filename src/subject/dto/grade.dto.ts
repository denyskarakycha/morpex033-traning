import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';
import { SubjectDto } from './subject.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GradeDto {
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  public student: UserDto;

  @ApiProperty({ type: SubjectDto })
  @Type(() => SubjectDto)
  public subject: SubjectDto;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  public grade: number;

  constructor(student: UserDto, subject: SubjectDto, grade: number) {
    this.student = student;
    this.subject = subject;
    this.grade = grade;
  }
}
