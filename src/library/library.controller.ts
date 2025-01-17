import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UUID } from 'crypto';
import { Auth } from '../auth/get-user.decorator';
import { UserDto } from '../user/dto/user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  getAllBooks(@Query() pagination: PaginationDto) {
    return this.libraryService.getAllBooks(pagination);
  }

  @Get('/:id')
  getBook(@Param('id') id: string) {
    return this.libraryService.getBookById(id);
  }

  @Post('/:id')
  issueBookToUser(@Param('id') id: string, @Auth() user: UserDto) {
    return this.libraryService.issueBook(id, user);
  }

  @Put('/:id')
  returnBook(@Param('id') id: string, @Auth() user: UserDto) {
    return this.libraryService.returnBook(id, user);
  }
}
