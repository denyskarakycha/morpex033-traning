import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
dotenvConfig({ path: '.env' });

export const databaseProviders: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
};

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: process.env.HOST,
//         port: Number(process.env.PORT),
//         username: process.env.USER_NAME,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE,
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//       });

//       return dataSource.initialize();
//     },
//   },
// ];
