import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty()
  public accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
