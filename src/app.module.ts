import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, SubjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
