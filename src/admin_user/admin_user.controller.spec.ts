import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserController } from './admin_user.controller';
import { AdminUserService } from './admin_user.service';

describe('AdminUserController', () => {
  let controller: AdminUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUserController],
    }).compile();

    controller = module.get<AdminUserController>(AdminUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an array of cats', async () => {
      const result = {
        username: "yvgvcjvvsjbenbdnbwa"
      };
      jest.spyOn(AdminUserService, 'login').mockImplementation(() => result);

      expect(await AdminUserService.login()).toBe(result);
    });
  });

});
