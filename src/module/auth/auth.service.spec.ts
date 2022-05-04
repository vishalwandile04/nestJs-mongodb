import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin_user/admin_user.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: AdminUserService;
  let jwtService: JwtService;

  const testUser = {
    username: 'vishal.wandile@anka.co.in',
    password: 'Anka@1234',
  };
  const user = { _id: '1', ...testUser };

  const JWTServiceProvider = {
    provide: JwtService,
    useFactory: () => ({
      signAsync: jest.fn(() => { }),
    })
  }

  const UsersServiceProvider = {
    provide: AdminUserService,
    useFactory: () => ({
      login: jest.fn((username) => {
        if (username === testUser.username)
          return testUser;
        else return null;
      }),
      create: jest.fn(() => { return { dataValues: testUser } }),
    })
  }
  const loggerServiceProvider = {
    provide: Logger,
    useFactory: () => ({
      log: jest.fn(() => { }),
      error: jest.fn(() => { }),
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUserService,
        JwtService,
        AuthService,
        JWTServiceProvider,
        UsersServiceProvider,
        Logger,
        loggerServiceProvider
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<AdminUserService>(AdminUserService);
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
  it('should validate user', async () => {
    const data = await authService.validateUserCredentials(testUser.username, testUser.password);
    expect(userService.login).toHaveBeenCalled();
    // jest.spyOn(userService, 'login').mockImplementation(() => Promise.resolve([user]))
    expect(data).toBeDefined();

    // jest.spyOn(userService, 'login').mockImplementation(() => [user]);
    expect(authService.validateUserCredentials(testUser.username, testUser.password)).toBeDefined();

    jest.spyOn(userService, 'login').mockImplementation(() => {
      throw new Error();
    });
    expect(authService.validateUserCredentials(testUser.username, testUser.password)).rejects.toBeDefined();

  });



  it('should validate user test with invalid user', async () => {

    const data = await authService.validateUserCredentials("hg vghvghvv", testUser.password);
    expect(data).toEqual(null);
  });

  it("should generate token(login)", async () => {
    // jest.spyOn(userService, 'login').mockReturnValueOnce([user])
    const data = await authService.loginWithCredentials({ username: testUser.username, password: testUser.password });
    expect(authService.validateUserCredentials(testUser.username, testUser.password)).toBeDefined();
    expect(data).toBeDefined();
  })

});