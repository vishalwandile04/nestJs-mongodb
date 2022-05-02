import { Test, TestingModule } from '@nestjs/testing';

import { IngAtmsService } from './ing-atms.service';
import { IngAtmsCreateDTO, IngAtmsUpdateDTO } from './ing-atms.dto';
import { IngAtms } from './ing-atms.model';
import { IngAtmsModule } from './ing-atms.module';

const result = {
    "id": "hgvhgvghvhujv",
    "name": "test1",
    "street": "street1",
    "city": "pune",
    "geoLocation": {
        "lat": "52.60022",
        "lng": "4.703054"
    }
}

describe('IngAtmsService', () => {
    let spyService: IngAtmsService;

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
            providers: [IngAtmsService, ApiServiceProvider],
        }).compile();

        spyService = app.get<IngAtmsService>(IngAtmsService);
    })

    it('should be defined', () => {
        expect(spyService).toBeDefined();
    });

    it('should call create method with expected params', async () => {
        const createSpy = jest.spyOn(spyService, 'addIngAtms');
        const dto = new IngAtmsCreateDTO();
        //spyService.create(dto);
        expect(spyService.addIngAtms(dto)).not.toEqual(null);
        expect(createSpy).toHaveBeenCalledWith(dto);
    });

    it('should call getIngAtms method', async () => {
        const findOneSpy = jest.spyOn(spyService, 'getIngAtms');
        spyService.getIngAtms();
        expect(findOneSpy).toHaveBeenCalled();
    });

    it('should call updateIngAtms method', async () => {
        const updateNoteSpy = jest.spyOn(spyService, 'updateIngAtms');
        const id = 'testId';
        const dto = new IngAtmsUpdateDTO();
        const resp = spyService.updateIngAtms(id, dto);
        expect(updateNoteSpy).toHaveBeenCalledWith(id, dto);
        expect(resp).toHaveBeenCalledWith(id, dto);
    });

    it('should call deleteIngATms method with expected param', async () => {
        const deleteSpy = jest.spyOn(spyService, 'deleteIngATms');
        const deleteId = 'deleteId';
        spyService.deleteIngATms(deleteId);
        expect(deleteSpy).toHaveBeenCalledWith(deleteId);
    });

    it('should call getSingleIngAtms by id method', async () => {
        const findOneSpy = jest.spyOn(spyService, 'getSingleIngAtms');
        const id = 'testId';
        spyService.getSingleIngAtms(id);
        expect(findOneSpy).toHaveBeenCalledWith(id);
    });

});