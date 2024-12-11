import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SingInUserDto {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(16)
  public password: string;
}
