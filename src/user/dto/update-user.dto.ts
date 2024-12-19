import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enum/user-role.enum';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(16)
  @IsNotEmpty()
  public password: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  public age: number;

  @IsEnum(UserRole, { message: 'Role must be either Student or Teacher' })
  @IsNotEmpty()
  public role: UserRole;
}
