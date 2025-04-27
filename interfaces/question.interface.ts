import { Document, Types } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  category_ids: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
