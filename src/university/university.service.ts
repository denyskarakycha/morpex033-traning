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
import { randomUUID, UUID } from 'crypto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { User } from 'src/database/entity/user.entity';
import { StudentDto } from './dto/student.dto';
import { GradeDto } from './dto/grade.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

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

      return {
        total: total,
        page: paginationDto.pageNumber,
        lastPage: Math.ceil(total / paginationDto.pageSize),
        data: subjects,
      };
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

      await this.subjectRepository.delete(subject.id);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async addStudentToSubject(id: UUID, studentDto: StudentDto) {
    try {
      const subject: Subject = await this.subjectRepository.findOne({
        where: { id },
        relations: { students: true },
      });
      const student: User = await this.userService.getUserById(studentDto.id);

      if (!subject || !student) {
        throw new NotFoundException('Subject or Student not found');
      }

      if (subject.students.some((s) => s.id === student.id)) {
        throw new ConflictException(
          'Student is already enrolled in this subject',
        );
      }

      subject.students.push(student);

      return await this.subjectRepository.save(subject);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteStudentFromSubject(subjectId: UUID, studentId: UUID) {
    try {
      const subject: Subject = await this.subjectRepository.findOne({
        where: { id: subjectId },
        relations: { students: true },
      });

      if (!subject) throw new NotFoundException('Subject not found');

      if (!subject.students.some((s) => s.id === studentId)) {
        throw new ConflictException('Student is not added to the subject');
      }

      const index = subject.students.findIndex(
        (student) => student.id === studentId,
      );

      subject.students.splice(index, 1);

      return await this.subjectRepository.save(subject);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async addGrade(subjectId: UUID, studentId: UUID, grade: GradeDto) {
    try {
      const subject: Subject = await this.subjectRepository.findOne({
        where: { id: subjectId },
        relations: { students: true },
      });
      const student: User = await this.userService.getUserById(studentId);

      if (!subject.students.some((s) => s.id === student.id)) {
        throw new ConflictException('Student is not found to the subject');
      }

      grade.subject = subject;
      grade.student = student;

      return await this.gradeRepository.save(grade);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllGrades(subjectId: UUID, paginationDto: PaginationDto) {
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

      return {
        total: total,
        page: paginationDto.pageNumber,
        lastPage: Math.ceil(total / paginationDto.pageSize),
        data: grades,
      };
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateGrade(
    subjectId: UUID,
    studentId: UUID,
    gradeDto: UpdateGradeDto,
  ) {
    try {
      const subject: Subject = await this.subjectRepository.findOne({
        where: { id: subjectId },
        relations: { students: true },
      });
      const student: User = await this.userService.getUserById(studentId);

      const grade: Grade = await this.gradeRepository.findOne({
        where: { subject: subject, student: student },
      });

      if (!subject.students.some((s) => s.id === student.id)) {
        throw new ConflictException('Student is not found to the subject');
      }

      if (!grade) throw new NotFoundException('Grade not found');

      await this.gradeRepository.update(grade.id, gradeDto);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteGrade(subjectId: UUID, gradeId: UUID) {
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

  async randomGenerateSubjects(round: number) {
    const subjectsName = [
      'Introduction to Computer Science',
      'Advanced Mathematics',
      'Principles of Economics',
      'English Literature',
      'Psychology 101',
      'History of Modern Art',
      'Organic Chemistry',
      'Physical Education',
      'Environmental Science',
      'Data Structures and Algorithms',
      'Business Management',
      'Sociology and Society',
      'World Geography',
      'Political Science',
      'Calculus for Engineers',
      'Microeconomics',
      'Programming in Python',
      'Molecular Biology',
      'Introduction to Philosophy',
      'Digital Marketing',
      'International Relations',
      'Artificial Intelligence',
      'Renewable Energy Technologies',
      'Civil Engineering Fundamentals',
      'Graphic Design Basics',
      'Music Theory',
      'Ethics in Technology',
      'Introduction to Finance',
      'Global Health and Wellness',
      'Urban Studies',
    ];

    const teachers: User[] = (
      await this.userService.getAllUsers(new PaginationDto())
    ).data.filter((user) => user.role === UserRole.Teacher);

    const shuffledSubjects = subjectsName.sort(() => Math.random() - 0.5);

    for (let index = 0; index < round; index++) {
      const randomTeacher =
        teachers[Math.floor(Math.random() * teachers.length)];

      const subjectDto: SubjectDto = {
        name: shuffledSubjects[index],
        teacher: randomTeacher,
        id: randomUUID(),
        students: [],
      };

      await this.createSubject(subjectDto);
    }
  }
}
