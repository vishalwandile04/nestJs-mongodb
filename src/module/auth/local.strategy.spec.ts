import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin_user/admin_user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

describe('Local Strategy', () => {
  let localStrategy: LocalStrategy;
  let spyService: AuthService;

  beforeEach(async () => {

    const ApiServiceProvider = {
        provide: AuthService,
        useFactory: () => ({
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
            ApiServiceProvider,
            UsersServiceProvider
          ],
      controllers: [LocalStrategy],
    }).compile();

    spyService = module.get<AuthService>(AuthService);
    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it("calling validate method", () => {
    let username = "vishal.wandile@anka.co.in";
    let password = "Anka@1234";

    expect(localStrategy.validate(username, password)).not.toEqual(null);
    expect(spyService.validateUserCredentials).toHaveBeenCalledWith(username, password);
  })
});
