import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { SortPaginationEnum } from 'src/common/enum/sort-pagination.enum';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  public pageNumber: number = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  public pageSize: number = 5;

  @IsOptional()
  @IsString()
  public sortBy: string = 'id';

  @IsOptional()
  @IsEnum(SortPaginationEnum)
  public order: SortPaginationEnum = SortPaginationEnum.ACS;
}
