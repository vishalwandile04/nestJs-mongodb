import { Test, TestingModule } from '@nestjs/testing';

import { IngAtmsController } from './ing-atms.controller';
import { IngAtmsService } from './ing-atms.service';
import { IngAtmsCreateDTO } from './ing-atms.dto';
import { Logger } from '@nestjs/common';

describe('IngATMs Controller', () => {
  let ingATMsController: IngAtmsController;
  let ingAtmsService: IngAtmsService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: IngAtmsService,
      useFactory: () => ({
        addIngAtms: jest.fn(() => []),
        getIngAtms: jest.fn(() => []),
        getSingleIngAtms: jest.fn(() => { }),
        updateIngAtms: jest.fn(() => { }),
        deleteIngATms: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IngAtmsController],
      providers: [IngAtmsService, ApiServiceProvider,Logger],
    }).compile();

    ingATMsController = app.get<IngAtmsController>(IngAtmsController);
    ingAtmsService = app.get<IngAtmsService>(IngAtmsService);
  })

  it("calling create method", () => {
    const dto = new IngAtmsCreateDTO();
    expect(ingATMsController.addIngAtms(dto)).not.toEqual(null);
  })

  it("calling findAll method", () => {
    ingATMsController.getAllIngAtms();
    expect(ingAtmsService.getIngAtms).toHaveBeenCalled();
  })

  it("calling findOne method", () => {
    ingATMsController.getIngAtms("12345");
    expect(ingAtmsService.getSingleIngAtms).toHaveBeenCalledWith("12345");
  })

  it("calling update method", () => {
    const dto = new IngAtmsCreateDTO();
    expect(ingATMsController.updateIngAtms("12345", dto)).not.toEqual(null);
    expect(ingAtmsService.updateIngAtms).toHaveBeenCalled();
    expect(ingAtmsService.updateIngAtms).toHaveBeenCalledWith("12345", dto);
  })

  it("calling delete method", () => {
    ingATMsController.removeIngAtms("12344");
    expect(ingAtmsService.deleteIngATms).toHaveBeenCalledWith("12344");
  })

  it('should be defined', () => {
    expect(ingATMsController).toBeDefined();
  });
});