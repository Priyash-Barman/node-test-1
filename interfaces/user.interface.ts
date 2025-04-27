import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  profile_picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
