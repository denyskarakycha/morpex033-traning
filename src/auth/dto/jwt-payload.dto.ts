import { UUID } from 'crypto';

export class JwtPayloadDto {
  public id: UUID;
  public email: string;
  public role: string;

  constructor(payload: any) {
    this.id = payload.id;
    this.email = payload.email;
    this.role = payload.role;
  }
}
