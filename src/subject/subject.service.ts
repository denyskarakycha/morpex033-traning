import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from '../database/entity/grade.entity';
import { Subject } from '../database/entity/subject.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { SubjectDto } from './dto/subject.dto';
import { UserRole } from '../user/enum/user-role.enum';
import { User } from '../database/entity/user.entity';
import { GradeDto } from './dto/grade.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateGradeDto } from './dto/create-grade.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PaginationDataResponseDto } from '../common/dto/pagination-data-response.dto';
import { UserDto } from '../user/dto/user.dto';
import { ResponseUserDto } from '../user/dto/response-user.dto';

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(
    private readonly userService: UserService,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async createSubject(subjectDto: CreateSubjectDto) {
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

      return new SubjectDto(createdSubject);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getSubject(id: string) {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { id: id },
        relations: { teacher: true, students: true },
      });

      return new SubjectDto(subject);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllSubject(paginationDto: PaginationDto) {
    try {
      const skip = (paginationDto.pageNumber - 1) * paginationDto.pageSize;

      const order: Record<string, 'ASC' | 'DESC'> = {};

      if (paginationDto.sortBy) {
        const sortOrder = paginationDto?.order || 'DESC';
        order[paginationDto.sortBy] = sortOrder;
      }

      const [subjects, total] = await this.subjectRepository.findAndCount({
        relations: { teacher: true, students: true },
        skip: skip,
        take: paginationDto.pageSize,
        order,
      });

      return new PaginationDataResponseDto<SubjectDto>(
        total,
        paginationDto.pageNumber,
        Math.ceil(total / paginationDto.pageSize),
        subjects.map((i) => new SubjectDto(i)),
      );
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateSubject(updateSubject: CreateSubjectDto, id: string) {
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

  async deleteSubject(id: string) {
    try {
      const subject = await this.subjectRepository.findOneBy({ id });

      if (!subject) {
        throw new NotFoundException('Subject not found');
      }

      await this.subjectRepository.delete(subject.id);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async addStudentToSubject(id: string, studentId: string) {
    try {
      console.log(studentId);

      const subject: Subject = await this.subjectRepository.findOne({
        where: { id },
        relations: { students: true },
      });

      const student: User = await this.userService.getUserById(studentId);
      console.log(student);

      if (!subject || !student) {
        throw new NotFoundException('Subject or Student not found');
      }

      if (student.role !== UserRole.Student) {
        throw new BadRequestException('User must have Student role');
      }

      if (subject.students.some((s) => s.id === student.id)) {
        throw new ConflictException(
          'Student is already enrolled in this subject',
        );
      }

      subject.students.push(student);

      return new SubjectDto(await this.subjectRepository.save(subject));
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteStudentFromSubject(subjectId: string, studentId: string) {
    try {
      const subject: Subject = await this.subjectRepository.findOne({
        where: { id: subjectId, students: { id: studentId } },
        relations: { students: true },
      });

      if (!subject) throw new NotFoundException('Subject not found');

      subject.students = subject.students.filter(
        (student) => student.id !== studentId,
      );

      return new SubjectDto(await this.subjectRepository.save(subject));
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async addGrade(subjectId: string, studentId: string, grade: CreateGradeDto) {
    try {
      const subject: Subject = await this.subjectRepository.findOne({
        where: { id: subjectId, students: { id: studentId } },
        relations: { students: true },
      });
      const student: User = await this.userService.getUserById(studentId);

      if (!subject) {
        throw new ConflictException('Student is not found to the subject');
      }

      const gradeDto = new GradeDto(
        new ResponseUserDto(student),
        new SubjectDto(subject),
        grade.grade,
      );

      await this.gradeRepository.save(gradeDto);

      return gradeDto;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllGrades(subjectId: string, paginationDto?: PaginationDto) {
    try {
      const subject = await this.subjectRepository.findOneBy({ id: subjectId });

      if (!subject) throw new NotFoundException('Subject not found');

      const skip = (paginationDto.pageNumber - 1) * paginationDto.pageSize;

      const order: Record<string, 'ASC' | 'DESC'> = {};

      if (paginationDto.sortBy) {
        const sortOrder = paginationDto?.order || 'DESC';
        order[paginationDto.sortBy] = sortOrder;
      }

      const [grades, total] = await this.gradeRepository.findAndCount({
        where: { subject: subject },
        relations: { student: true },
        skip: skip,
        take: paginationDto.pageSize,
        order,
      });

      return new PaginationDataResponseDto<GradeDto>(
        total,
        paginationDto.pageNumber,
        Math.ceil(total / paginationDto.pageSize),
        grades.map((i) => new GradeDto(i.student, i.subject, i.grade)),
      );
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getGradesByStudentAndSubject(studentId: string, subjectId: string) {
    try {
      const user = await this.userService.getUserById(studentId);
      const subject = await this.subjectRepository.findOne({
        where: { id: subjectId },
      });
      const grades = await this.gradeRepository
        .createQueryBuilder('grade')
        .leftJoinAndSelect('grade.student', 'student')
        .leftJoinAndSelect('grade.subject', 'subject')
        .where('grade.student = :studentId', { studentId: `${user.id}` })
        .andWhere('grade.subject = :subjectId', { subjectId: `${subject.id}` })
        .getMany();

      return grades;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateGrade(
    subjectId: string,
    studentId: string,
    gradeDto: CreateGradeDto,
  ) {
    try {
      const subject: Subject = await this.subjectRepository.findOne({
        where: { id: subjectId, students: { id: studentId } },
        relations: { students: true },
      });
      const student: User = await this.userService.getUserById(studentId);

      if (!subject) {
        throw new ConflictException('Student is not found to the subject');
      }

      const grade: Grade = await this.gradeRepository.findOne({
        where: { subject, student },
      });

      if (!grade) throw new NotFoundException('Grade not found');

      await this.gradeRepository.update(grade.id, gradeDto);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteGrade(subjectId: string, gradeId: string) {
    try {
      const subject = await this.subjectRepository.findOneBy({ id: subjectId });

      if (!subject) throw new NotFoundException('Subject not found');

      const grade: Grade = await this.gradeRepository.findOneBy({
        id: gradeId,
        subject: subject,
      });

      if (!grade) throw new NotFoundException('Grade not found');

      await this.gradeRepository.delete(grade.id);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async randomGenerateSubjects(round: number, id: string) {
    const subjects: Subject[] = await this.subjectRepository
      .createQueryBuilder('subject')
      .orderBy('RANDOM()')
      .limit(round)
      .getMany();

    const student: UserDto = await this.userService.getUserById(id);

    student.subjects.push(...subjects);

    return await this.userService.updateUser(student);
  }
}
