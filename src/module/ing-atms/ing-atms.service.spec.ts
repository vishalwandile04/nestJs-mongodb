import { Test, TestingModule } from '@nestjs/testing';

import { IngAtmsService } from './ing-atms.service';
import { IngAtmsCreateDTO, IngAtmsUpdateDTO } from './ing-atms.dto';
import { HttpException, HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { Atms, IngAtmssSchema } from './ing-atms.model';
import { MongooseModule } from '@nestjs/mongoose';

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
            imports: [
                MongooseModule.forFeature([{
                    name: "Ing_Atms",
                    schema: IngAtmssSchema
                }])
            ],
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
            providers: [IngAtmsService, ApiServiceProvider, loggerServiceProvider],
        }).compile();

        ingAtmsService = app.get<IngAtmsService>(IngAtmsService);
    })

    it('should be defined', () => {
        expect(ingAtmsService).toBeDefined();
    });

    it('should call create method with expected params', async () => {
        const createSpy = jest.spyOn(ingAtmsService, 'addIngAtms');
        const dto = new IngAtmsCreateDTO();
        ingAtmsService.addIngAtms(dto);
        expect(ingAtmsService.addIngAtms(dto)).not.toEqual(null);
        expect(createSpy).toHaveBeenCalledWith(dto);
        jest.spyOn(ingAtmsService, 'addIngAtms').mockImplementation(() => {
            throw new HttpException('Not found.', HttpStatus.INTERNAL_SERVER_ERROR);
        });
        jest.spyOn(ingAtmsService, 'addIngAtms').mockImplementation(() => {
            throw new InternalServerErrorException();
        });
    });

    const ATMS = new Atms()

    it('should call getIngAtms method', async () => {

        jest.spyOn(ingAtmsService, 'getIngAtms').mockResolvedValue([ATMS]);
        const data1 = await ingAtmsService.getIngAtms();
        expect(ingAtmsService.getIngAtms).toHaveBeenCalled();
        expect(data1).toBeDefined();

        const findOneSpy = jest.spyOn(ingAtmsService, 'getIngAtms');
        const data = ingAtmsService.getIngAtms();
        expect(data).not.toEqual(null);
        expect(findOneSpy).toHaveBeenCalled();
        jest.spyOn(ingAtmsService, 'getIngAtms').mockImplementation(() => {
            throw new InternalServerErrorException();
        });
    });

    it('should call updateIngAtms method', async () => {
        const updateNoteSpy = jest.spyOn(ingAtmsService, 'updateIngAtms');
        const id = 'testId';
        const dto = new IngAtmsUpdateDTO();
        const resp = ingAtmsService.updateIngAtms(id, dto);
        expect(updateNoteSpy).toHaveBeenCalledWith(id, dto);
        expect(resp).not.toEqual(null);
        jest.spyOn(ingAtmsService, 'updateIngAtms').mockImplementation(() => {
            throw new InternalServerErrorException();
        });
    });

    it('should call deleteIngATms method with expected param', async () => {
        const deleteSpy = jest.spyOn(ingAtmsService, 'deleteIngATms');
        const deleteId = 'deleteId';
        ingAtmsService.deleteIngATms(deleteId);
        expect(deleteSpy).toHaveBeenCalledWith(deleteId);
        jest.spyOn(ingAtmsService, 'deleteIngATms').mockImplementation(() => {
            throw new InternalServerErrorException();
        });
    });

    it('should call getSingleIngAtms by id method', async () => {
        const findOneSpy = jest.spyOn(ingAtmsService, 'getSingleIngAtms');
        const id = 'testId';
        ingAtmsService.getSingleIngAtms(id);
        expect(findOneSpy).toHaveBeenCalledWith(id);
        jest.spyOn(ingAtmsService, 'getSingleIngAtms').mockImplementation(() => {
            throw new InternalServerErrorException();
        });
    });

});