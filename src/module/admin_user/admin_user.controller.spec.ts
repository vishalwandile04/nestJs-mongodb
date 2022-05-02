import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserController } from './admin_user.controller';
import { AdminUserService } from './admin_user.service';

describe('AdminUserController', () => {
  let controller: AdminUserController;
  let spyService: AdminUserService;
  const result = {
    username: "test@gmail.com",
    password: "test"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUserController],
      providers: [Logger]
    }).compile();

    controller = module.get<AdminUserController>(AdminUserController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user', async () => {
    const data = spyService.login(result.username, result.password);
    expect(spyService.login).toHaveBeenCalledWith(result.username, result.password);

  });
});
