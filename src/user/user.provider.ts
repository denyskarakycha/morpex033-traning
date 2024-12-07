import { User } from 'src/database/entity/user.entity';
import { DataSource } from 'typeorm';

// delete this

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
