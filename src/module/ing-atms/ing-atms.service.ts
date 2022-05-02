import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IngAtms } from './ing-atms.model';

@Injectable()
export class IngAtmsService {
    constructor(@InjectModel('Ing_Atms') private readonly IngAtmsModel: Model<IngAtms>,
    ) { }

    // save ing atm in database
    async addIngAtms(ingATM: IngAtms) {
        try {
            const newIngATms = new this.IngAtmsModel(ingATM);
            const result = await newIngATms.save();
            if (!result) {
                throw new HttpException('Not Added.', HttpStatus.BAD_REQUEST);
            }
            return result;

        } catch (error) {
            throw new HttpException('Error is Adding.', HttpStatus.BAD_REQUEST);
        }
    }

    // fetch list of all items from database
    async getIngAtms() {
        const result = await this.IngAtmsModel.find().exec();
        if (!result) {
            throw new HttpException('Not found.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result
    }

    // fetching single ing atms by id from database
    async getSingleIngAtms(id: string) {
        try {
            const result = await this.IngAtmsModel.findById(id);
            return result;
        } catch (error) {
            throw new HttpException('Error in fetching Ing-Atms.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // update ing atm in db and return updated data
    async updateIngAtms(id: string, IngAtm: IngAtms) {
        try {
            const result = await this.IngAtmsModel.findOneAndUpdate({ _id: id }, IngAtm);
            return result;
        } catch (error) {
            throw new HttpException('Error in updating Ing-Atms.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // delete ing atms from db by id
    async deleteIngATms(id: string) {
        try {
            const result = await this.IngAtmsModel.deleteOne({ _id: id });
            return "Deleted Successfully";
        } catch (error) {
            throw new HttpException('Error in Deleting Ing-Atms.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
