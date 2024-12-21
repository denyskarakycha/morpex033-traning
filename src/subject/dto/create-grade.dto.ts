import { IsNumber, Max, Min } from 'class-validator';

export class CreateGradeDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  public grade: number;
}
