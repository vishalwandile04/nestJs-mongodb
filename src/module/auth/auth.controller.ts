import { Controller, Body, Post, UseGuards, Logger, LoggerService, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';

import { AuthDTO } from '../admin_user/admin_user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOkResponse({ description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async login(@Body() req: AuthDTO) {
    this.logger.log(`AuthController Login(): username:${req.username}, password:${req.password}`);
    try {
      return this.authService.loginWithCredentials(req);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
