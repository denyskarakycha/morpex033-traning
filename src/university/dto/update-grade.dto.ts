import { IsNumber, Max, Min } from 'class-validator';

export class UpdateGradeDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  public grade: number;
}
