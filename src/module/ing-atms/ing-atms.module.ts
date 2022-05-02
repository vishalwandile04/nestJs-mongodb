import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngAtmsController } from './ing-atms.controller';
import { IngAtmssSchema } from './ing-atms.model';
import { IngAtmsService } from './ing-atms.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "Ing_Atms",
      schema: IngAtmssSchema
    }])
  ],
  controllers: [IngAtmsController],
  providers: [IngAtmsService, Logger],
  exports: [IngAtmsService]
})
export class IngAtmsModule { }
