import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { UUID } from 'crypto';
import { UserRole } from 'src/user/enum/user-role.enum';

export class StudentDto {
  @Exclude()
  public id: UUID;

  @IsString()
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  public age: number;

  @IsEnum(UserRole, { message: 'Role must be either Student or Teacher' })
  public role: UserRole;
}
