import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../admin_user/admin_user.dto';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
   
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOkResponse({ description: "Login Successful." })
  async login(@Body() req: AuthDTO) {
    return this.authService.loginWithCredentials(req);
  }

}
