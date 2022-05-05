import { Test, TestingModule } from '@nestjs/testing';

import { IngAtmsController } from './ing-atms.controller';
import { IngAtmsService } from './ing-atms.service';
import { IngAtmsCreateDTO } from './ing-atms.dto';
import { Logger } from '@nestjs/common';

describe('IngATMs Controller', () => {
  let ingATMsController: IngAtmsController;
  let ingAtmsService: IngAtmsService;
  beforeAll(async () => {
    const ingAtmsServiceProvider = {
      provide: IngAtmsService,
      useFactory: () => ({
        addIngAtms: jest.fn(() => []),
        getIngAtms: jest.fn(() => []),
        getSingleIngAtms: jest.fn(() => { }),
        updateIngAtms: jest.fn(() => { }),
        deleteIngATms: jest.fn(() => { })
      })
    }
    const loggerServiceProvider = {
      provide: Logger,
      useFactory: () => ({
        log: jest.fn(() => { }),
        error: jest.fn(() => { }),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IngAtmsController],
      providers: [IngAtmsService, ingAtmsServiceProvider, loggerServiceProvider],
    }).compile();

    ingATMsController = app.get<IngAtmsController>(IngAtmsController);
    ingAtmsService = app.get<IngAtmsService>(IngAtmsService);
  })

  it("calling create method", () => {
    expect(ingATMsController.addIngAtms({
      name: 'test', street: "street", city: "nbvhgv",
      geoLocation: {
        lat: "23.22",
        lng: "23.66"
      }
    })).not.toEqual(null);
    jest.spyOn(ingAtmsService, 'addIngAtms').mockImplementation(() => {
      throw new Error();
    });
    expect(ingATMsController.addIngAtms({
      name: 'test', street: "street", city: "nbvhgv",
      geoLocation: {
        lat: "23.22",
        lng: "23.66"
      }
    })).rejects.toMatchObject({
      message: "Internal server error"
    });
  })

  it("calling findAll method", () => {
    ingATMsController.getAllIngAtms();
    expect(ingAtmsService.getIngAtms).toHaveBeenCalled();
    jest.spyOn(ingAtmsService, 'getIngAtms').mockImplementation(() => {
      throw new Error();
    });
    expect(ingATMsController.getAllIngAtms()).rejects.toMatchObject({
      message: "Internal server error"
    });
  })

  it("calling findOne method", () => {
    ingATMsController.getIngAtms("12345");
    expect(ingAtmsService.getSingleIngAtms).toHaveBeenCalledWith("12345");
    jest.spyOn(ingAtmsService, 'getSingleIngAtms').mockImplementation(() => {
      throw new Error();
    });
    expect(ingATMsController.getIngAtms("12345")).rejects.toMatchObject({
      message: "Internal server error"
    });
  })

  it("calling update method", () => {
    const dto = new IngAtmsCreateDTO();
    expect(ingATMsController.updateIngAtms("12345", {
      name: 'test', street: "street", city: "nbvhgv",
      geoLocation: {
        lat: "23.22",
        lng: "23.66"
      }
    })).not.toEqual(null);
    expect(ingAtmsService.updateIngAtms).toHaveBeenCalled();
    expect(ingAtmsService.updateIngAtms).toHaveBeenCalledWith("12345", {
      name: 'test', street: "street", city: "nbvhgv",
      geoLocation: {
        lat: "23.22",
        lng: "23.66"
      }
    });
    jest.spyOn(ingAtmsService, 'updateIngAtms').mockImplementation(() => {
      throw new Error();
    });
    expect(ingATMsController.updateIngAtms("123", {
      name: 'test', street: "street", city: "nbvhgv",
      geoLocation: {
        lat: "23.22",
        lng: "23.66"
      }
    })).rejects.toMatchObject({
      message: "Internal server error"
    });
  })

  it("calling delete method", () => {
    ingATMsController.removeIngAtms("12344");
    expect(ingAtmsService.deleteIngATms).toHaveBeenCalledWith("12344");
    jest.spyOn(ingAtmsService, 'deleteIngATms').mockImplementation(() => {
      throw new Error();
    });
    expect(ingATMsController.removeIngAtms("1")).rejects.toMatchObject({
      message: "Internal server error"
    });
  })

  it('should be defined', () => {
    expect(ingATMsController).toBeDefined();
  });
});