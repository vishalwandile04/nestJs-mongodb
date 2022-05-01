import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserController } from './admin_user.controller';
import { AdminUserSchema } from './admin_user.model';
import { AdminUserService } from './admin_user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "Admin_User",
      schema: AdminUserSchema
    }]),
  ],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService]
})

export class AdminUserModule { }
