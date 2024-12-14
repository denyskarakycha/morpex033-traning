import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/enum/user-role.enum';

export const Roles = Reflector.createDecorator<UserRole[]>();
