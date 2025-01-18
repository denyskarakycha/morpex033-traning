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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(16)
  @IsNotEmpty()
  public password: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  public age: number;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole, { message: 'Role must be either Student or Teacher' })
  @IsNotEmpty()
  public role: UserRole;
}
