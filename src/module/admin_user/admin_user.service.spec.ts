import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from './admin_user.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('AdminUserService', () => {
  let adminUserService: AdminUserService;
  let repositoryMock;
  const result = {
    username: "test@gmail.com",
    password: "test"
  };

  const mockUserRepository = {
    findOne: jest.fn(() => result),
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUserService],
    }).compile();

    adminUserService = module.get<AdminUserService>(AdminUserService);
    repositoryMock = module.get<AdminUserService>(AdminUserService);
  })

  it('should be defined', () => {
    expect(adminUserService).toBeDefined();
  });

  it('should return user by id', async () => {
    const data = adminUserService.login(result.username, result.password);
    expect(repositoryMock.findOne).toHaveBeenCalled();
    expect(data).toBeDefined();

  });

});