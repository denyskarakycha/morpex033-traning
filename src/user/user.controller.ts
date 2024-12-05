import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  addUser(@Body() createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }
}
