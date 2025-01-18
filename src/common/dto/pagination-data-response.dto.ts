import { ApiProperty } from '@nestjs/swagger';

export class PaginationDataResponseDto<T> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty({ isArray: true, type: Object })
  data: T[];

  constructor(total: number, page: number, lastPage: number, data: T[]) {
    this.total = total;
    this.page = page;
    this.lastPage = lastPage;
    this.data = data;
  }
}
