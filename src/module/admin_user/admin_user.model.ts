import * as mongoose from "mongoose";
import { Document, Model } from 'mongoose'

export const AdminUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

export interface AdminUser extends Document {
  _id: string,
  username: string,
  password: string,
}

export const User: Model<AdminUser> = mongoose.model('Admin_User', AdminUserSchema)
