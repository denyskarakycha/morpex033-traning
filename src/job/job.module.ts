import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../database/entity/job.entity';
import { UserModule } from '../user/user.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [
    UserModule,
    SubjectModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Job]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
