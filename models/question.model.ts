import mongoose, { Schema, model } from "mongoose";
import { IQuestion } from "../interfaces/question.interface";

const question_schema = new Schema<IQuestion>({
  question: { type: String, required: true },
  category_ids: [{ type: Schema.Types.ObjectId, ref: 'categories' }]
}, { timestamps: true });

export const Question = model<IQuestion>('questions', question_schema);
