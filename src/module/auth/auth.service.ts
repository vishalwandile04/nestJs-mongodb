import { HttpException, HttpStatus, Injectable, Logger, LoggerService, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthDTO } from '../admin_user/admin_user.dto';
import { AdminUserService } from '../admin_user/admin_user.service';

@Injectable()
export class AuthService {
    constructor(@Inject(Logger) private readonly logger: LoggerService,
        private adminUserService: AdminUserService,
        private jwtTokenService: JwtService) { }

    async validateUserCredentials(username: string, password: string): Promise<any> {
        this.logger.log("Inside validateUserCredentials()");
        try {
            const user = await this.adminUserService.login(username, password);
            if (user && user.password === password) {
                return user;
            }
            return null;
        } catch (error) {
            this.logger.error(error);
            throw new HttpException('Error in Validating User.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async loginWithCredentials(user: AuthDTO) {
        this.logger.log(`Inside loginWithCredentials() payload=${user}`);
        const payload = { username: user.username };
        return {
            statusCode: HttpStatus.OK,
            data: {
                access_token: this.jwtTokenService.sign(payload),
            }
        };
    }
}