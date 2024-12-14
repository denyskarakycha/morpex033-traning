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
import { SingUpUserDto } from './dto/sing-up-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from './enum/user-role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles([UserRole.Teacher])
  @Get()
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.getAllUsers(paginationDto);
  }

  @Get('/:id')
  getUser(@Param('id') id: UUID) {
    return this.userService.getUserById(id);
  }

  @Roles([UserRole.Teacher])
  @Delete('/:id')
  deleteUser(@Param('id') id: UUID) {
    return this.userService.deleteUserById(id);
  }

  @Roles([UserRole.Teacher])
  @Put('/:id')
  updateUser(@Param('id') id: UUID, @Body() updateUserDto: SingUpUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }
}
