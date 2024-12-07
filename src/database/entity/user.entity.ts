import { UUID } from 'crypto';
import { UserRole } from 'src/user/enum/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column('int')
  age: number;

  @Column({
    enum: UserRole,
  })
  role: UserRole;
}
