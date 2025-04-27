import { IQuestion } from "../interfaces/question.interface";
import { Category } from "../models/category.model";
import { Question } from "../models/question.model";
import csvtojson from "csvtojson";

class QuestionService {
  async load_from_csv(questions_csv: Express.Multer.File): Promise<boolean> {
    try {
      const csv_buffer = questions_csv.buffer.toString("utf-8");
      const json_array = await csvtojson().fromString(csv_buffer);

      // prepare questions
      const questions: IQuestion[] = json_array.map(
        (row: any) =>
          ({
            question: row.question,
            category_ids: row.category_ids
              .split(",")
              .map((id: string) => id.trim()),
          } as IQuestion)
      );

      // insert questions
      const inserted_questions = await Question.insertMany(questions);

      return true;
    } catch (error) {
      return false;
    }
  }

  async get_questions_by_category(): Promise<any[]> {
    return await Category.aggregate([
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "category_ids",
          as: "questions",
        },
      },
      {
        $project: {
          name: 1,
          questions: {
            _id: 1,
            question: 1,
          },
        },
      },
    ]);
  }
}

export default QuestionService;
