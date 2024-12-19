import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/database/entity/grade.entity';
import { Subject } from 'src/database/entity/subject.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SubjectDto } from './dto/subject.dto';
import { UserRole } from 'src/user/enum/user-role.enum';
import { UUID } from 'crypto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class UniversityService {
  private readonly logger = new Logger(UniversityService.name);

  constructor(
    private readonly userService: UserService,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async createSubject(subjectDto: SubjectDto) {
    try {
      const subject = await this.subjectRepository.findOneBy({
        name: subjectDto.name,
      });

      if (subject) {
        throw new ConflictException();
      }

      if (subjectDto.teacher.role !== UserRole.Teacher) {
        throw new ConflictException('User has no role Teacher');
      }

      const createdSubject: Subject =
        await this.subjectRepository.save(subjectDto);

      return createdSubject;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getSubject(id: UUID) {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { id: id },
        relations: { teacher: true, students: true },
      });

      return subject;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateSubject(updateSubject: UpdateSubjectDto, id: UUID) {
    try {
      const subject = await this.subjectRepository.findOneBy({ id });

      if (!subject) {
        throw new NotFoundException('Subject not found');
      }

      await this.subjectRepository.update(subject.id, updateSubject);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteSubject(id: UUID) {
    try {
      const subject = await this.subjectRepository.findOneBy({ id });

      if (!subject) {
        throw new NotFoundException('Subject not found');
      }

      await this.subjectRepository.delete(subject);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
