import { HttpException, HttpStatus, Injectable, InternalServerErrorException, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IngAtms } from './ing-atms.model';

@Injectable()
export class IngAtmsService {
    constructor(@InjectModel('Ing_Atms') private readonly IngAtmsModel: Model<IngAtms>, readonly logger: LoggerService,
    ) { }

    // save ing atm in database
    async addIngAtms(ingATM: IngAtms) {
        this.logger.log(`Inside addIngAtms()`);
        try {
            const newIngATms = new this.IngAtmsModel(ingATM);
            const result = await newIngATms.save();
            if (!result) {
                throw new HttpException('Not Added.', HttpStatus.BAD_REQUEST);
            }
            return result;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Internal server error')
        }
    }

    // fetch list of all items from database
    async getIngAtms() {
        this.logger.log(`Inside getIngAtms()`);
        try {
            const result = await this.IngAtmsModel.find().exec();
            if (!result) {
                throw new HttpException('Not found.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return result;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Internal server error')
        }
    }

    // fetching single ing atms by id from database
    async getSingleIngAtms(id: string) {
        this.logger.log(`Inside getSingleIngAtms()`);
        try {
            const result = await this.IngAtmsModel.findById(id);
            return result;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Internal server error')
        }
    }

    // update ing atm in db and return updated data
    async updateIngAtms(id: string, IngAtm: IngAtms) {
        this.logger.log(`Inside updateIngAtms()`);
        try {
            const result = await this.IngAtmsModel.findOneAndUpdate({ _id: id }, IngAtm);
            return result;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Internal server error')
        }
    }

    // delete ing atms from db by id
    async deleteIngATms(id: string) {
        this.logger.log(`Inside deleteIngATms()`);
        try {
            const result = await this.IngAtmsModel.deleteOne({ _id: id });
            return "Deleted Successfully";
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Internal server error')
        }
    }
}
