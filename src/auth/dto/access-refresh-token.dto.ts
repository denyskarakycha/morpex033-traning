import { ApiProperty } from '@nestjs/swagger';

export class AccessRefreshTokenDto {
  @ApiProperty()
  public accessToken: string;
  @ApiProperty()
  public refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
