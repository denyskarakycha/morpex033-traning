import { classToPlain, Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
import { UUID } from 'crypto';

export class SingUpUserDto {
  @Exclude()
  public id: UUID;

  @IsString()
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(16)
  public password: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  public age: number;

  @IsEnum(UserRole, { message: 'Role must be either Student or Teacher' })
  public role: UserRole;
}
