import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JobDto } from './dto/job.dto';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiResponse({ type: JobDto, isArray: true })
  @Post('/for-student/:id')
  findJobForStudent(@Param('id') id: string, @Query('search') search: string) {
    return this.jobService.findJobForStudent(id, search);
  }
}
