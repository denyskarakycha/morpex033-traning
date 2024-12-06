import { UUID } from 'crypto';
import { UserRole } from 'src/user/enum/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column({ length: 50 })
  name: string;

  @Column('int')
  age: number;

  @Column()
  role: UserRole;
}
