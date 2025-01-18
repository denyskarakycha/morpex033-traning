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
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/enum/user-role.enum';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateGradeDto } from './dto/create-grade.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectService } from './subject.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { SubjectDto } from './dto/subject.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-pagination-response.decorator';
import { GradeDto } from './dto/grade.dto';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiResponse({ type: ResponseUserDto })
  @Post('/random/:round/student/:id')
  @Roles([UserRole.Admin])
  randomSubjectGenerate(
    @Param('round') round: number,
    @Param('id') id: string,
  ) {
    return this.subjectService.randomGenerateSubjects(round, id);
  }

  @ApiResponse({ type: SubjectDto })
  @Post()
  @Roles([UserRole.Admin])
  createSubject(@Body() subject: CreateSubjectDto) {
    return this.subjectService.createSubject(subject);
  }

  @ApiResponse({ type: SubjectDto })
  @Get('/:id')
  getSubject(@Param('id') id: string) {
    return this.subjectService.getSubject(id);
  }

  @ApiPaginatedResponse(SubjectDto)
  @Get()
  getAllSubject(@Query() pagination: PaginationDto) {
    return this.subjectService.getAllSubject(pagination);
  }

  @ApiOkResponse()
  @Put('/:id')
  @Roles([UserRole.Admin])
  updateSubject(@Param('id') id: string, @Body() subject: CreateSubjectDto) {
    return this.subjectService.updateSubject(subject, id);
  }

  @ApiOkResponse()
  @Delete('/:id')
  @Roles([UserRole.Admin])
  deleteSubject(@Param('id') id: string) {
    return this.subjectService.deleteSubject(id);
  }

  @ApiResponse({ type: SubjectDto })
  @Post('/:id/add-student/:studentId')
  @Roles([UserRole.Admin])
  addStudentToSubject(
    @Param('id') subjectId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.subjectService.addStudentToSubject(subjectId, studentId);
  }

  @ApiResponse({ type: SubjectDto })
  @Delete('/:subjectId/student/:studentId')
  @Roles([UserRole.Admin])
  deleteStudentFromSubject(
    @Param('subjectId') subjectId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.subjectService.deleteStudentFromSubject(subjectId, studentId);
  }

  @ApiResponse({ type: GradeDto })
  @Post('/:subjectId/student/:studentId')
  @Roles([UserRole.Teacher, UserRole.Admin])
  addGrade(
    @Param('subjectId') subjectId: string,
    @Param('studentId') studentId: string,
    @Body() grade: CreateGradeDto,
  ) {
    return this.subjectService.addGrade(subjectId, studentId, grade);
  }

  @ApiPaginatedResponse(GradeDto)
  @Get('/:subjectId/grade')
  getAllGrades(
    @Param('subjectId') subjectId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.subjectService.getAllGrades(subjectId, pagination);
  }

  @ApiOkResponse()
  @Put('/:subjectId/student/:studentId/grade')
  @Roles([UserRole.Teacher, UserRole.Admin])
  updateGrade(
    @Param('subjectId') subjectId: string,
    @Param('studentId') studentId: string,
    @Body() grade: CreateGradeDto,
  ) {
    return this.subjectService.updateGrade(subjectId, studentId, grade);
  }

  @ApiOkResponse()
  @Delete('/:subjectId/grade/:gradeId')
  @Roles([UserRole.Teacher, UserRole.Admin])
  deleteGrade(
    @Param('subjectId') subjectId: string,
    @Param('gradeId') gradeId: string,
  ) {
    return this.subjectService.deleteGrade(subjectId, gradeId);
  }
}
