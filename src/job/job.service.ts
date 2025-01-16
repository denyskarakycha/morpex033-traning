import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { XMLParser } from 'fast-xml-parser';
import * as TurndownService from 'turndown';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../database/entity/job.entity';
import { Cron } from '@nestjs/schedule';
import { UUID } from 'crypto';
import { UserService } from '../user/user.service';
import { SubjectService } from '../subject/subject.service';
import { UserDto } from '../user/dto/user.dto';
import { JobDto } from './dto/job.dto';

dotenvConfig({ path: '.env' });

@Injectable()
export class JobService {
  logger = new Logger(JobService.name);
  private turndownService: TurndownService;

  constructor(
    private readonly subjectService: SubjectService,
    private readonly userService: UserService,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {
    this.turndownService = new TurndownService();
  }

  @Cron('0 0 * * *')
  async fetchJobs() {
    try {
      const fetchUrl = process.env.JOB_API_URL;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const parser = new XMLParser();
      const result = parser.parse(await response.text());

      const data = result.rss.channel.item;

      for (const element of data) {
        const description = this.turndownService.turndown(element.description);

        const job = new CreateJobDto(element, description);

        await this.jobRepository.save(job);
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getJobById(id: UUID) {
    try {
      const job = await this.jobRepository.findOne({ where: { id } });

      if (!job) throw new NotFoundException('Job not found');

      return job;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findJobForStudent(id: UUID) {
    try {
      const student: UserDto = await this.userService.getUserById(id);

      const keywords = [];

      for (const subject of student.subjects) {
        const grades = await this.subjectService.getAllGrades(subject.id);

        for (const grade of grades.data) {
          if (grade.student.id === student.id && grade.grade >= 60)
            keywords.push(...grade.subject.name);
        }
      }

      if (keywords.length === 0)
        throw new NotFoundException('You have no job recommendations');

      const jobs: JobDto[] = await this.jobRepository
        .createQueryBuilder()
        .where(
          keywords
            .map((_, index) => `job.description ILIKE :keyword${index}`)
            .join(' AND '),
          keywords.reduce((params, keyword, index) => {
            params[`keyword${index}`] = `%${keyword}%`;
            return params;
          }, {}),
        )
        .limit(200)
        .getRawMany();

      return jobs;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
