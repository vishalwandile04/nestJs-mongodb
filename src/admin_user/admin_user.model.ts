import * as mongoose from "mongoose";

export const AdminUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

export interface AdminUser {
  id: string,
  username: string,
  password: string,
}
