import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Subject } from '../../database/entity/subject.entity';
import { UserDto } from '../../user/dto/user.dto';

export class SubjectDto {
  @ApiProperty()
  @IsUUID()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty({ type: UserDto })
  public teacher: UserDto;

  @ApiProperty({ isArray: true, type: UserDto })
  public students: UserDto[];

  constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.teacher = subject.teacher;
    this.students = subject.students;
  }
}
