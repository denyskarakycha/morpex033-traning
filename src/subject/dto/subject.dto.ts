import { IsUUID } from 'class-validator';
import { Subject } from 'src/database/entity/subject.entity';
import { UserDto } from 'src/user/dto/user.dto';

export class SubjectDto {
  @IsUUID()
  public id: string;

  public name: string;

  public teacher: UserDto;

  public students: UserDto[];

  constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.teacher = subject.teacher;
    this.students = subject.students;
  }
}
