import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const user_schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  profile_picture: { type: String }
}, { timestamps: true });

export const User = model<IUser>('users', user_schema);
