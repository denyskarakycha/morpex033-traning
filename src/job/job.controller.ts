import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/for-student/:id')
  findJobForStudent(@Param('id') id: string, @Query('search') search: string) {
    return this.jobService.findJobForStudent(id, search);
  }
}
