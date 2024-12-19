import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, UniversityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
