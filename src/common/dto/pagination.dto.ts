import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public pageNumber: number = 1;

  @ApiProperty({ required: false, default: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public pageSize: number = 5;

  @ApiProperty({ required: false, default: 'id' })
  @IsOptional()
  @IsString()
  public sortBy: string = 'id';

  @ApiProperty({ required: false, enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  public order?: 'ASC' | 'DESC';
}
