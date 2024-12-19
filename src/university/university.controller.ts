import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@UseGuards(AuthGuard, RolesGuard)
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post('/subject')
  @Roles([UserRole.Admin])
  createSubject(@Body() subject: SubjectDto) {
    return this.universityService.createSubject(subject);
  }

  @Get('/subject/:id')
  getSubject(@Param('id') id: UUID) {
    return this.universityService.getSubject(id);
  }

  @Put('/subject/:id')
  updateSubject(@Param('id') id: UUID, subject: UpdateSubjectDto) {
    return this.universityService.updateSubject(subject, id);
  }

  @Delete('/subject/:id')
  deleteSubject(@Param('id') id: UUID) {
    return this.universityService.deleteSubject(id);
  }
}
