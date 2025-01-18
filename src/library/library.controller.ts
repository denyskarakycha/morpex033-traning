import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators/get-user.decorator';
import { UserDto } from '../user/dto/user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiPaginatedResponse } from '../common/decorators/api-pagination-response.decorator';
import { BookDto } from './dto/book.dto';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @ApiPaginatedResponse(BookDto)
  @Get()
  getAllBooks(@Query() pagination: PaginationDto) {
    return this.libraryService.getAllBooks(pagination);
  }

  @ApiResponse({ type: BookDto })
  @Get('/:id')
  getBook(@Param('id') id: string) {
    return this.libraryService.getBookById(id);
  }

  @ApiResponse({ type: BookDto })
  @Post('/:id')
  issueBookToUser(@Param('id') id: string, @Auth() user: UserDto) {
    return this.libraryService.issueBook(id, user);
  }

  @ApiResponse({ type: BookDto })
  @Put('/:id')
  returnBook(@Param('id') id: string, @Auth() user: UserDto) {
    return this.libraryService.returnBook(id, user);
  }
}
