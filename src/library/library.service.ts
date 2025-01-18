import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../database/entity/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaginationDto } from '../common/dto/pagination.dto';
import { BookDto } from './dto/book.dto';
import { PaginationDataResponseDto } from '../common/dto/pagination-data-response.dto';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Injectable()
export class LibraryService {
  logger = new Logger(LibraryService.name);

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private readonly userService: UserService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async fetchBooks() {
    const baseUrl = process.env.BOOK_API_URL;
    let url = baseUrl;

    while (url) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      for (const book of data.results) {
        try {
          const createBookDto = new CreateBookDto(book);
          const existBook = await this.bookRepository
            .createQueryBuilder('book')
            .where('book.title = :title', { title: createBookDto.title })
            .andWhere('book.authors @> :authors', {
              authors: JSON.stringify(createBookDto.authors),
            })
            .getOne();

          if (existBook) {
            if (!existBook.takenBy) continue;
            await this.bookRepository.update(existBook.id, createBookDto);
          } else {
            await this.bookRepository.save(createBookDto);
          }
        } catch (error) {
          this.logger.log(error);
          throw new InternalServerErrorException(error);
        }
      }
      url = data.next;
    }
  }

  async getAllBooks(paginationDto: PaginationDto) {
    try {
      const skip = (paginationDto.pageNumber - 1) * paginationDto.pageSize;

      const order: Record<string, 'ASC' | 'DESC'> = {};

      if (paginationDto.sortBy) {
        const sortOrder = paginationDto?.order || 'DESC';
        order[paginationDto.sortBy] = sortOrder;
      }

      const [books, total] = await this.bookRepository.findAndCount({
        relations: {},
        skip: skip,
        take: paginationDto.pageSize,
        order,
      });

      return new PaginationDataResponseDto<BookDto>(
        total,
        paginationDto.pageNumber,
        Math.ceil(total / paginationDto.pageSize),
        books.map((i) => new BookDto(i)),
      );
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getBookById(id: string) {
    try {
      const book = await this.bookRepository.findOneBy({ id });

      return new BookDto(book);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async issueBook(id: string, user: UserDto) {
    try {
      const returnBy = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const book = await this.bookRepository.findOneBy({ id });

      if (!book || book.takenBy) throw new NotFoundException('Book not found');

      book.takenBy = user;
      book.takenAt = new Date(Date.now());
      book.returnBy = returnBy;

      const bookDto: BookDto = await this.bookRepository.save(book);

      return bookDto;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async returnBook(id: string, user: UserDto) {
    try {
      const book = await this.bookRepository.findOne({
        where: { id, takenBy: user },
      });

      if (!book) throw new NotFoundException('Book not found');

      book.takenAt = null;
      book.takenBy = null;
      book.returnBy = null;

      const bookDto: BookDto = await this.bookRepository.save(book);

      return bookDto;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
