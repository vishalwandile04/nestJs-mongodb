import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser } from './admin_user.model';

@Injectable()
export class AdminUserService {
    constructor(@InjectModel('Admin_User') private readonly adminUserModel: Model<AdminUser>,
    ) { }

    async login(username: string, password: string) {
        try {
            const result = await this.adminUserModel.findOne({ username }).exec();
            if (!result) {
                throw new HttpException('Please Enter Correct username and password.', HttpStatus.BAD_REQUEST);
            }
            return result;
          
        } catch (error) {
            throw new HttpException('Please Enter Correct username and password.', HttpStatus.BAD_REQUEST);
        }
    }
}