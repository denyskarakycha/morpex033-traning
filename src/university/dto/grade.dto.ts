import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';
import { Subject } from 'src/database/entity/subject.entity';
import { User } from 'src/database/entity/user.entity';

export class GradeDto {
  @Type(() => User)
  public student: User;

  @Type(() => Subject)
  public subject: Subject;

  @IsNumber()
  @Min(0)
  @Max(100)
  public grade: number;
}
