import { UserController } from '../user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UserDto } from '../dto/user.dto';
import { UserRole } from '../enum/user-role.enum';
import { PaginationDataResponseDto } from '../../common/dto/pagination-data-response.dto';

const getMockPaginationDto = (overrides = {}): PaginationDto => ({
  pageNumber: 1,
  pageSize: 5,
  sortBy: 'id',
  order: 'ASC',
  ...overrides,
});

const getMockUserDto = (overrides = {}): UserDto => ({
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  age: 1,
  role: UserRole.Student,
  taughtSubjects: [],
  subjects: [],
  books: [],
  ...overrides,
});

const getMockPaginationDataResponseDto = (
  overrides = {},
): PaginationDataResponseDto<T> => ({
  total: 1,
  page: 1,
  lastPage: 1,
  data: [{getMockPaginationDto}],
  ...overrides,
});

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should be return pagination User', async () => {
      jest
        .spyOn(userService, 'getAllUsers')
        .mockResolvedValue(getMockUserDto());
      const result = await userController.getAllUsers(getMockPaginationDto());
    });
  });
});
