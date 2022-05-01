import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin_user/admin_user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  let spyService: AuthService;
  let userService: AdminUserService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        loginWithCredentials: jest.fn(() => {})
      })
    }

    const UsersServiceProvider = {
      provide: AdminUserService,
      useFactory: () => ({
        findOneByEmail: jest.fn(() => {}),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AdminUserService,
        ApiServiceProvider,
        UsersServiceProvider
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
    userService =  module.get<AdminUserService>(AdminUserService);
  });

  it("calling login method", () => {
    let loginReq = {username:'',password:''};
    expect(controller.login(loginReq)).not.toEqual(null);
    expect(spyService.loginWithCredentials).toHaveBeenCalledWith(loginReq);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});