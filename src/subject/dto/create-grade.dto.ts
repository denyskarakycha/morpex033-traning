import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  public grade: number;
}
