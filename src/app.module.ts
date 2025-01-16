import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { LibraryModule } from './library/library.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    SubjectModule,
    LibraryModule,
    ScheduleModule.forRoot(),
    JobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
