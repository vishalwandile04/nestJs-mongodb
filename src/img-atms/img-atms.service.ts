import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ImgAtms } from './img-atms.model';

@Injectable()
export class ImgAtmsService {
    constructor(@InjectModel('Img_Atms') private readonly imgAtmsModel: Model<ImgAtms>,
    ) { }

    async addImgAtms(ingATM: ImgAtms) {
        try {
            const newImgATms = new this.imgAtmsModel(ingATM);
            const result = await newImgATms.save();
            if (!result) {
                throw new HttpException('Not Added.', HttpStatus.BAD_REQUEST);
            }
            return result;

        } catch (error) {
            throw new HttpException('Error is Adding.', HttpStatus.BAD_REQUEST);
        }
    }

    async getImgAtms() {
        const result = await this.imgAtmsModel.find().exec();
        if (!result) {
            throw new HttpException('Not found.', HttpStatus.BAD_REQUEST);
        }
        console.log(result)
        return result;
    }

    async getSingleImgAtms(id: string) {
        const result = await this.imgAtmsModel.findById(id);
        return result;
    }

    async updateImgAtms(id: string, imgAtm: ImgAtms) {
        const result = await this.imgAtmsModel.findOneAndUpdate({ _id: id }, imgAtm);
        return result;
    }

    async deleteImgATms(id: string) {
        const result = await this.imgAtmsModel.deleteOne({ _id: id });
        return result;
    }
}
