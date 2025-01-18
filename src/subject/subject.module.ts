import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../database/entity/subject.entity';
import { Grade } from '../database/entity/grade.entity';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Subject, Grade]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
