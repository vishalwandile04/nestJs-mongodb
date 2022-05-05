import { InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../admin_user/admin_user.model';
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

  const JWTServiceProvider = {
    provide: JwtService,
    useFactory: () => ({
      signAsync: jest.fn(() => { }),
    })
  }

  const UsersServiceProvider = {
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

  const user = new User();

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
  it('should validate user', async () => {
    jest.spyOn(userService, 'login').mockResolvedValue(user);
    const data = await authService.validateUserCredentials(testUser.username, testUser.password);
    expect(userService.login).toHaveBeenCalled();
    expect(data).toBeDefined();
    jest.spyOn(userService, 'login').mockImplementation(() => {
      throw new Error();
    });
    expect(authService.validateUserCredentials(testUser.username, testUser.password)).rejects.toBeDefined();
  });

  it('should validate user test with invalid user', async () => {
    jest.spyOn(userService, 'login').mockResolvedValue(user);
    const data = await authService.validateUserCredentials("hg vghvghvv", testUser.password);
    expect(data).toEqual(null);
  });

  it("should generate token(login)", async () => {
    jest.spyOn(authService, 'validateUserCredentials').mockReturnValueOnce(Promise.resolve(user));
    await userService.login(testUser.username, testUser.password);
    const data = await authService.loginWithCredentials({ username: testUser.username, password: testUser.password });
    expect(data).toBeDefined();
  })
  // it("should throw 401 Unauthorized error when user is not valid in login service", async () => {
  //   jest.spyOn(userService, 'login').mockImplementation(() => null);
  //   jest.spyOn(authService, 'validateUserCredentials').mockReturnValueOnce(Promise.resolve(null));
  //   expect(authService.loginWithCredentials({ username: testUser.username, password: testUser.password })).rejects.toThrow(UnauthorizedException);
  // })

  it("should throw 500 error when error occurred", async () => {
    jest.spyOn(userService, 'login').mockImplementation(() => null);
    jest.spyOn(authService, 'validateUserCredentials').mockImplementation(() => { throw new InternalServerErrorException() });
    expect(authService.loginWithCredentials({ username: testUser.username, password: testUser.password })).rejects.toThrow(InternalServerErrorException);
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

});