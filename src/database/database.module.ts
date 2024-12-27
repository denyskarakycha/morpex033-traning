import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseProviders,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
