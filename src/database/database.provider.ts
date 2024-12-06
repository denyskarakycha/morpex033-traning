import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: '6w8e43z5df6',
        database: 'university',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
