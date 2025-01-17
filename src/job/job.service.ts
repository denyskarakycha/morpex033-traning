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
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { SubjectService } from '../subject/subject.service';
import { UserDto } from '../user/dto/user.dto';
import { JobDto } from './dto/job.dto';
import { query } from 'express';

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

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
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

  async getJobById(id: string) {
    try {
      const job = await this.jobRepository.findOne({ where: { id } });

      if (!job) throw new NotFoundException('Job not found');

      return job;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findJobForStudent(id: string, query?: string) {
    try {
      const student: UserDto = await this.userService.getUserById(id);

      if (!student) throw new NotFoundException('Student not found');

      const keywords = [];

      if (query) {
        keywords.push(query.split(',').map((word) => word.trim()));
      }

      for (const subject of student.subjects) {
        const grades = await this.subjectService.getGradesByStudentAndSubject(
          student.id,
          subject.id,
        );

        for (const grade of grades) {
          if (grade.student.id === student.id && grade.grade >= 80)
            keywords.push(grade.subject.name);
        }
      }

      if (keywords.length === 0)
        throw new NotFoundException('You have no job recommendations');

      const queryBuilder = this.jobRepository.createQueryBuilder('job');

      queryBuilder.where(
        `to_tsvector(regexp_replace("job"."description", '\\.', '', 'g')) @@ to_tsquery(:query)`,
        {
          query: keywords.join(' | '),
        },
      );

      const jobs: Job[] = await queryBuilder.limit(100).getMany();

      return jobs.map((job) => new JobDto(job));
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findFilteredJob() {}
}
