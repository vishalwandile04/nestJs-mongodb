import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Logger, LoggerService, Inject } from '@nestjs/common';

import { jwtConstants } from '../../core/constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(Logger) private readonly logger: LoggerService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        this.logger.log(`In JwtStrategy validate()...payload=${payload}`);
        return { userId: payload.sub, username: payload.username }
    }
}