import * as mongoose from "mongoose";
import { Document, Model } from 'mongoose'

export class GeoLocation {
  lat: string
  lng: string
}

export const IngAtmssSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: false },
  city: { type: String, required: false },
  geoLocation: {
    lat: { type: String, required: false },
    lng: { type: String, required: false },
  }
})

export interface IngAtms {
  name: string,
  street: string,
  city: string,
  geoLocation: GeoLocation
}


export const Atms: Model<IngAtms> = mongoose.model('Ing_Atms', IngAtmssSchema)
