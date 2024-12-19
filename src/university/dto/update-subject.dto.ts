import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/database/entity/user.entity';

export class UpdateSubjectDto {
  @IsString()
  public name: string;

  @Type(() => User)
  public teacher: User;
}
