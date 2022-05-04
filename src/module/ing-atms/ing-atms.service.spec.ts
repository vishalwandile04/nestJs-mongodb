import { Test, TestingModule } from '@nestjs/testing';

import { IngAtmsService } from './ing-atms.service';
import { IngAtmsCreateDTO, IngAtmsUpdateDTO } from './ing-atms.dto';
import { Logger } from '@nestjs/common';

const result = {
    "id": "hgvhgvghvhujv",
    "name": "test",
    "street": "street",
    "city": "pune",
    "geoLocation": {
        "lat": "52.60022",
        "lng": "4.703054"
    }
}

describe('IngAtmsService', () => {
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
            providers: [IngAtmsService, ApiServiceProvider, Logger],
        }).compile();

        ingAtmsService = app.get<IngAtmsService>(IngAtmsService);
    })

    it('should be defined', () => {
        expect(ingAtmsService).toBeDefined();
    });

    it('should call create method with expected params', async () => {
        const createSpy = jest.spyOn(ingAtmsService, 'addIngAtms');
        const dto = new IngAtmsCreateDTO();
        //ingAtmsService.create(dto);
        expect(ingAtmsService.addIngAtms(dto)).not.toEqual(null);
        expect(createSpy).toHaveBeenCalledWith(dto);
    });

    it('should call getIngAtms method', async () => {
        const findOneSpy = jest.spyOn(ingAtmsService, 'getIngAtms');
        ingAtmsService.getIngAtms();
        expect(findOneSpy).toHaveBeenCalled();
    });

    it('should call updateIngAtms method', async () => {
        const updateNoteSpy = jest.spyOn(ingAtmsService, 'updateIngAtms');
        const id = 'testId';
        const dto = new IngAtmsUpdateDTO();
        const resp = ingAtmsService.updateIngAtms(id, dto);
        expect(updateNoteSpy).toHaveBeenCalledWith(id, dto);
        expect(resp).toHaveBeenCalledWith(id, dto);
    });

    it('should call deleteIngATms method with expected param', async () => {
        const deleteSpy = jest.spyOn(ingAtmsService, 'deleteIngATms');
        const deleteId = 'deleteId';
        ingAtmsService.deleteIngATms(deleteId);
        expect(deleteSpy).toHaveBeenCalledWith(deleteId);
    });

    it('should call getSingleIngAtms by id method', async () => {
        const findOneSpy = jest.spyOn(ingAtmsService, 'getSingleIngAtms');
        const id = 'testId';
        ingAtmsService.getSingleIngAtms(id);
        expect(findOneSpy).toHaveBeenCalledWith(id);
    });

});