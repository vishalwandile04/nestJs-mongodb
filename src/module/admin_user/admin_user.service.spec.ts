import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from './admin_user.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('AdminUserService', () => {
  let spyService: AdminUserService;
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

    spyService = module.get<AdminUserService>(AdminUserService);
    repositoryMock = module.get<AdminUserService>(AdminUserService);
  })

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('should return user by id', async () => {
    const data = spyService.login(result.username, result.password);
    expect(repositoryMock.findOne).toHaveBeenCalled();
    expect(data).toBeDefined();

  });

});