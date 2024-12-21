import { UUID } from 'crypto';
import { Subject } from 'src/database/entity/subject.entity';
import { UserDto } from 'src/user/dto/user.dto';

export class SubjectDto {
  public id: UUID;

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
