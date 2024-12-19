import { Exclude, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { UUID } from 'crypto';
import { User } from 'src/database/entity/user.entity';

export class SubjectDto {
  @Exclude()
  public id: UUID;

  @IsString()
  public name: string;

  @Type(() => User)
  public teacher: User;

  @Exclude()
  public students: User[];
}
