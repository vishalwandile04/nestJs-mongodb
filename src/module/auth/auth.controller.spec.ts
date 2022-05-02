import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin_user/admin_user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';

describe('Auth Controller', () => {
  let controller: AuthController;
  let spyService: AuthService;
  let userService: AdminUserService;
  let localStrategy: LocalStrategy;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        loginWithCredentials: jest.fn(() => { }),
        validateUserCredentials: jest.fn(() => { })
      })
    }

    const UsersServiceProvider = {
      provide: AdminUserService,
      useFactory: () => ({
        login: jest.fn(() => { }),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AdminUserService,
        ApiServiceProvider,
        UsersServiceProvider,
        Logger
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
    userService = module.get<AdminUserService>(AdminUserService);
  });

  it("calling login method", () => {
    let loginReq = { username: '', password: '' };
    expect(controller.login(loginReq)).not.toEqual(null);
    expect(spyService.loginWithCredentials).toHaveBeenCalledWith(loginReq);
  })

  it("calling validate method", () => {
    let username = "vishal.wandile@anka.co.in";
    let password = "Anka@1234";

    expect(localStrategy.validate(username, password)).not.toEqual(null);
    expect(spyService.validateUserCredentials).toHaveBeenCalledWith(username, password);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should ensure the JwtAuthGuard is applied to the controller', async () => {

    expect(JwtAuthGuard).toBeDefined();
  });

});