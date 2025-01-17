import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/database/entity/subject.entity';
import { Grade } from 'src/database/entity/grade.entity';

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
