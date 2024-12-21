import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { SubjectDto } from './subject.dto';

export class GradeDto {
  @Type(() => UserDto)
  public student: UserDto;

  @Type(() => SubjectDto)
  public subject: SubjectDto;

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
