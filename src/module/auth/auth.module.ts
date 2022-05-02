import { Module, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminUserModule } from '../admin_user/admin_user.module';
import { AuthService } from './auth.service';
import { jwtConstants, TOKEN_EXPIRATION } from '../../core/constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    AdminUserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: TOKEN_EXPIRATION }
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, Logger],
  exports: [AuthService]
})
export class AuthModule { }