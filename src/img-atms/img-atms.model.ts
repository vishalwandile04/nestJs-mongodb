import * as mongoose from "mongoose";

export const ImgAtmssSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

export interface ImgAtms {
  name: string,
}
