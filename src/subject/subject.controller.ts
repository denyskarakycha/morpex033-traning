import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';
import { UUID } from 'crypto';
import { StudentDto } from './dto/student.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateGradeDto } from './dto/create-grade.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectService } from './subject.service';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('/random/:round/student/:id')
  @Roles([UserRole.Admin])
  randomSubjectGenerate(@Param('round') round: number, @Param('id') id: UUID) {
    return this.subjectService.randomGenerateSubjects(round, id);
  }

  @Post()
  @Roles([UserRole.Admin])
  createSubject(@Body() subject: CreateSubjectDto) {
    console.log(subject);

    return this.subjectService.createSubject(subject);
  }

  @Get('/:id')
  getSubject(@Param('id') id: UUID) {
    return this.subjectService.getSubject(id);
  }

  @Get()
  getAllSubject(@Query() pagination: PaginationDto) {
    return this.subjectService.getAllSubject(pagination);
  }

  @Put('/:id')
  @Roles([UserRole.Admin])
  updateSubject(@Param('id') id: UUID, @Body() subject: CreateSubjectDto) {
    return this.subjectService.updateSubject(subject, id);
  }

  @Delete('/:id')
  @Roles([UserRole.Admin])
  deleteSubject(@Param('id') id: UUID) {
    return this.subjectService.deleteSubject(id);
  }

  @Post('/:id')
  @Roles([UserRole.Admin])
  addStudentToSubject(
    @Param('id') subjectId: UUID,
    @Body() student: StudentDto,
  ) {
    return this.subjectService.addStudentToSubject(subjectId, student);
  }

  @Delete('/:subjectId/student/:studentId')
  @Roles([UserRole.Admin])
  deleteStudentFromSubject(
    @Param('subjectId') subjectId: UUID,
    @Param('studentId') studentId: UUID,
  ) {
    return this.subjectService.deleteStudentFromSubject(subjectId, studentId);
  }

  @Post('/:subjectId/student/:studentId')
  @Roles([UserRole.Teacher, UserRole.Admin])
  addGrade(
    @Param('subjectId') subjectId: UUID,
    @Param('studentId') studentId: UUID,
    @Body() grade: CreateGradeDto,
  ) {
    return this.subjectService.addGrade(subjectId, studentId, grade);
  }

  @Get('/:subjectId/grade')
  getAllGrades(
    @Param('subjectId') subjectId: UUID,
    @Query() pagination: PaginationDto,
  ) {
    return this.subjectService.getAllGrades(subjectId, pagination);
  }

  @Put('/:subjectId/student/:studentId/grade')
  @Roles([UserRole.Teacher, UserRole.Admin])
  updateGrade(
    @Param('subjectId') subjectId: UUID,
    @Param('studentId') studentId: UUID,
    @Body() grade: CreateGradeDto,
  ) {
    return this.subjectService.updateGrade(subjectId, studentId, grade);
  }

  @Delete('/:subjectId/grade/:gradeId')
  @Roles([UserRole.Teacher, UserRole.Admin])
  deleteGrade(
    @Param('subjectId') subjectId: UUID,
    @Param('gradeId') gradeId: UUID,
  ) {
    return this.subjectService.deleteGrade(subjectId, gradeId);
  }
}
