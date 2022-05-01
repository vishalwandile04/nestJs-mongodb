import * as mongoose from "mongoose";

export const IngAtmssSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

export interface IngAtms {
  id: string
  name: string,
}
