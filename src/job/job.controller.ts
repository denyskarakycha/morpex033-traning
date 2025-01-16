import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { UUID } from 'crypto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  findJobForStudent(@Body('id') id: UUID) {
    return this.jobService.findJobForStudent(id);
  }
}
