import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from './enum/user-role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles([UserRole.Teacher, UserRole.Admin])
  @Get()
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.getAllUsers(paginationDto);
  }

  @Get('/:id')
  getUser(@Param('id') id: UUID) {
    return this.userService.getUserById(id);
  }

  @Roles([UserRole.Teacher, UserRole.Admin])
  @Delete('/:id')
  deleteUser(@Param('id') id: UUID) {
    return this.userService.deleteUserById(id);
  }

  @Roles([UserRole.Admin])
  @Put('/:id')
  updateUserById(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }
}
