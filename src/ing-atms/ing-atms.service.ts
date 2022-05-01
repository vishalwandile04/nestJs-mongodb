import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IngAtms } from './ing-atms.model';

@Injectable()
export class IngAtmsService {
    constructor(@InjectModel('Ing_Atms') private readonly IngAtmsModel: Model<IngAtms>,
    ) { }

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

    async getIngAtms() {
        const result = await this.IngAtmsModel.find().exec();
        if (!result) {
            throw new HttpException('Not found.', HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async getSingleIngAtms(id: string) {
        const result = await this.IngAtmsModel.findById(id);
        return result;
    }

    async updateIngAtms(id: string, IngAtm: IngAtms) {
        const result = await this.IngAtmsModel.findOneAndUpdate({ _id: id }, IngAtm);
        return result;
    }

    async deleteIngATms(id: string) {
        try {
            const result = await this.IngAtmsModel.deleteOne({ _id: id });
            return "Deleted Successfully"; 
        } catch (error) {
            return error;
        }
      
    }
}
