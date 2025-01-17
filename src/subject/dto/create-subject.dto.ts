import { Type } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class CreateSubjectDto {
  @IsString()
  @MaxLength(20)
  public name: string;

  @Type(() => UserDto)
  public teacher: UserDto;
}
