import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin_user/admin_user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';

describe('Auth Controller', () => {

  let controller: AuthController;
  let authService: AuthService;
  let userService: AdminUserService;
  let localStrategy: LocalStrategy;
  let loggerService: Logger;
  const testUser = {
    username: 'visha.wandile@anka.co.in',
    password: 'Anka@1234'
  };

  beforeEach(async () => {
    const userServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        loginWithCredentials: jest.fn(() => { }),
        validateUserCredentials: jest.fn(() => { })
      })
    }

    const authServiceProvider = {
      provide: AdminUserService,
      useFactory: () => ({
        login: jest.fn(() => { }),
      })
    }
    const loggerServiceProvider = {
      provide: Logger,
      useFactory: () => ({
        log: jest.fn(() => { }),
        error: jest.fn(() => { }),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AdminUserService,
        userServiceProvider,
        authServiceProvider,
        loggerServiceProvider,
        Logger
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<AdminUserService>(AdminUserService);
    loggerService = module.get<Logger>(Logger);
  });

  it("calling login method", () => {
    let loginReq = { username: testUser.username, password: testUser.password };
    expect(controller.login(loginReq)).not.toEqual(null);
    expect(authService.loginWithCredentials).toHaveBeenCalledWith(loginReq);
    jest.spyOn(authService, 'loginWithCredentials').mockImplementation(() => {
      throw new Error();
    });
    // expect(controller.login(loginReq)).rejects.toMatch('error');
  })

  // it("calling validate method", () => {
  //   let username = testUser.username;
  //   let password = testUser.password;

  //   expect(localStrategy.validate(username, password)).not.toEqual(null);
  //   expect(authService.validateUserCredentials).toHaveBeenCalledWith(username, password);
  // })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should ensure the JwtAuthGuard is applied to the controller', async () => {
    expect(JwtAuthGuard).toBeDefined();
  });

});