import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImgAtmsController } from './img-atms.controller';
import { ImgAtmssSchema } from './img-atms.model';
import { ImgAtmsService } from './img-atms.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "Img_Atms",
      schema: ImgAtmssSchema
    }])
  ],
  controllers: [ImgAtmsController],
  providers: [ImgAtmsService],
  exports: [ImgAtmsService]
})
export class ImgAtmsModule { }
