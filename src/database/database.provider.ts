import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
dotenvConfig({ path: '.env' });

export const databaseProviders: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
  migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
  migrationsRun: false,
};

export const database = new DataSource(databaseProviders);
