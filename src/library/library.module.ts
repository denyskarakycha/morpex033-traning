import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../database/entity/book.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule, TypeOrmModule.forFeature([Book])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
