import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger, LoggerService, Inject } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(Logger) private readonly logger: LoggerService,
    private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`In LocalStrategy validate() username==${username} password==${password}`);
    try {
      const user = await this.authService.validateUserCredentials(username, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Error in Validating User.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}