import { IsString, MaxLength, MinLength } from 'class-validator';

export class SingInUserDto {
  @IsString()
  public name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(16)
  public password: string;
}
