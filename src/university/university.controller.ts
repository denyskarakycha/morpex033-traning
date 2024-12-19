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
import { UniversityService } from './university.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';
import { SubjectDto } from './dto/subject.dto';
import { UUID } from 'crypto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { StudentDto } from './dto/student.dto';
import { GradeDto } from './dto/grade.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('university/subject')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post('/random/:round')
  @Roles([UserRole.Admin])
  randomSubjectGenerate(@Param('round') round: number) {
    return this.universityService.randomGenerateSubjects(round);
  }

  @Post()
  @Roles([UserRole.Admin])
  createSubject(@Body() subject: SubjectDto) {
    return this.universityService.createSubject(subject);
  }

  @Get('/:id')
  getSubject(@Param('id') id: UUID) {
    return this.universityService.getSubject(id);
  }

  @Get()
  getAllSubject(@Query() pagination: PaginationDto) {
    return this.universityService.getAllSubject(pagination);
  }

  @Put('/:id')
  @Roles([UserRole.Admin])
  updateSubject(@Param('id') id: UUID, @Body() subject: UpdateSubjectDto) {
    return this.universityService.updateSubject(subject, id);
  }

  @Delete('/:id')
  @Roles([UserRole.Admin])
  deleteSubject(@Param('id') id: UUID) {
    return this.universityService.deleteSubject(id);
  }

  @Post('/:id')
  @Roles([UserRole.Admin])
  addStudentToSubject(
    @Param('id') subjectId: UUID,
    @Body() student: StudentDto,
  ) {
    return this.universityService.addStudentToSubject(subjectId, student);
  }

  @Delete('/:subjectId/student/:studentId')
  @Roles([UserRole.Admin])
  deleteStudentFromSubject(
    @Param('subjectId') subjectId: UUID,
    @Param('studentId') studentId: UUID,
  ) {
    return this.universityService.deleteStudentFromSubject(
      subjectId,
      studentId,
    );
  }

  @Post('/:subjectId/student/:studentId')
  @Roles([UserRole.Teacher, UserRole.Admin])
  addGrade(
    @Param('subjectId') subjectId: UUID,
    @Param('studentId') studentId: UUID,
    @Body() grade: GradeDto,
  ) {
    return this.universityService.addGrade(subjectId, studentId, grade);
  }

  @Get('/:subjectId/grade')
  getAllGrades(
    @Param('subjectId') subjectId: UUID,
    @Query() pagination: PaginationDto,
  ) {
    return this.universityService.getAllGrades(subjectId, pagination);
  }

  @Put('/:subjectId/student/:studentId/grade')
  @Roles([UserRole.Teacher, UserRole.Admin])
  updateGrade(
    @Param('subjectId') subjectId: UUID,
    @Param('studentId') studentId: UUID,
    @Body() grade: UpdateGradeDto,
  ) {
    return this.universityService.updateGrade(subjectId, studentId, grade);
  }

  @Delete('/:subjectId/grade/:gradeId')
  @Roles([UserRole.Teacher, UserRole.Admin])
  deleteGrade(
    @Param('subjectId') subjectId: UUID,
    @Param('gradeId') gradeId: UUID,
  ) {
    return this.universityService.deleteGrade(subjectId, gradeId);
  }
}
