import { Test, TestingModule } from '@nestjs/testing';
import { ImgAtmsController } from './img-atms.controller';

describe('ImgAtmsController', () => {
  let controller: ImgAtmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgAtmsController],
    }).compile();

    controller = module.get<ImgAtmsController>(ImgAtmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
