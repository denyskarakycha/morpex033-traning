import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class CreateSubjectDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  public name: string;

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  public teacher: UserDto;
}
