import mongoose, { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/category.interface";

const category_schema = new Schema<ICategory>({
  name: { type: String, required: true }
}, { timestamps: true });

export const Category = model<ICategory>('categories', category_schema);
