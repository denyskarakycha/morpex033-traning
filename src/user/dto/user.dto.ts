import { UUID } from 'crypto';
import { SubjectDto } from 'src/subject/dto/subject.dto';
import { UserRole } from '../enum/user-role.enum';
import { User } from 'src/database/entity/user.entity';

export class UserDto {
  public id: UUID;

  public name: string;

  public email: string;

  public password: string;

  public age: number;

  public role: UserRole;

  public taughtSubjects: SubjectDto[];

  public subjects: SubjectDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.age = user.age;
    this.role = user.role;
    this.taughtSubjects = user.taughtSubjects;
    this.subjects = user.subjects;
  }
}
