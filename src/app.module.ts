import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserModule } from './module/admin_user/admin_user.module';
import { AuthModule } from './module/auth/auth.module';
import { IngAtmsModule } from './module/ing-atms/ing-atms.module';

@Module({
  imports: [
    AdminUserModule,
    MongooseModule.forRoot(
      "mongodb+srv://vishalwandile:iGB9JF6JJaacVITI@cluster0.ya21i.mongodb.net/ing_atms?retryWrites=true&w=majority"
    ),
    AuthModule,
    IngAtmsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
