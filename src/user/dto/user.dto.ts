import { Exclude } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
import { UUID } from 'crypto';

export class UserDto {
  @Exclude()
  public id: UUID;

  @IsString()
  public name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  public age: number;

  @IsEnum(UserRole, { message: 'Role must be either Student or Teacher' })
  public role: UserRole;
}
