import { Exclude } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @Exclude()
  public id: string;

  @IsString()
  public name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  public age: number;
}
