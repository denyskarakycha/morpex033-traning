import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  public pageNumber: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  public pageSize: number;

  @IsOptional()
  @IsString()
  public sortBy: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  public order: 'ASC' | 'DESC';
}
