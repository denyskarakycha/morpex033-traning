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
import { UserRole } from './enum/user-role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserDto } from './dto/user.dto';
import { ApiPaginatedResponse } from '../common/decorators/api-pagination-response.decorator';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiPaginatedResponse(UserDto)
  @Roles([UserRole.Teacher, UserRole.Admin])
  @Get()
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.getAllUsers(paginationDto);
  }

  @ApiResponse({ type: ResponseUserDto })
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOkResponse()
  @Roles([UserRole.Teacher, UserRole.Admin])
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @ApiResponse({ type: ResponseUserDto })
  @Roles([UserRole.Admin])
  @Put('/:id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }
}
