import { Test, TestingModule } from '@nestjs/testing';

import { IngAtmsController } from './ing-atms.controller';
import { IngAtmsService } from './ing-atms.service';
import { IngAtmsCreateDTO, IngAtmsUpdateDTO } from './ing-atms.dto';

describe('IngATMs Controller', () => {
  let IngAtmsController: IngAtmsController;
  let spyService: IngAtmsService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: IngAtmsService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        update: jest.fn(() => { }),
        delete: jest.fn(() => { })
      })
    }
    // const app: TestingModule = await Test.createTestingModule({
    //   controllers: [IngAtmsController],
    //   providers: [IngAtmsService, ApiServiceProvider],
    // }).compile();

    // IngAtmsController = app.get<IngAtmsController>(IngAtmsController);
    // spyService = app.get<IngAtmsService>(IngAtmsService);
  })

  it("calling create method", () => {
    const dto = new IngAtmsCreateDTO();
    expect(IngAtmsController.addIngAtms(dto)).not.toEqual(null);
  })

  // it("calling findAll method", () => {
  //   IngAtmsController.getAllIngAtms();
  //   expect(spyService.findAll).toHaveBeenCalled();
  // })

  // it("calling update method", () => {
  //   const dto = new IngAtmsUpdateDTO();
  //   expect(IngAtmsController.updateIngAtms(1,dto)).not.toEqual(null);
  //   expect(spyService.update).toHaveBeenCalled();
  //   expect(spyService.update).toHaveBeenCalledWith(1,dto);
  // })

  // it("calling delete method", () => {
  //   IngAtmsController.removeIngAtms("1");
  //   expect(spyService.delete).toHaveBeenCalledWith("1");
  // })

  it('should be defined', () => {
    expect(IngAtmsController).toBeDefined();
  });
});