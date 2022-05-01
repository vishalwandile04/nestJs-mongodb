import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from 'src/admin_user/admin_user.dto';
import { AdminUserService } from 'src/admin_user/admin_user.service';

@Injectable()
export class AuthService {
    constructor(private adminUserService: AdminUserService, private jwtTokenService: JwtService) { }

    async validateUserCredentials(username: string, password: string): Promise<any> {
        const user = await this.adminUserService.login(username, password);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async loginWithCredentials(user: AuthDTO) {
        const payload = { username: user.username };

        return {
            statusCode: HttpStatus.OK,
            message: "Login Successfully.",
            data: {
                access_token: this.jwtTokenService.sign(payload),
            }
        };
    }
}