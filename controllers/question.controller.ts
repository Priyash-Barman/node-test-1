import { Request, Response } from "express";
import services from "../services";

export class QuestionController {
  async add_questions_from_csv(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({ message: "Please select csv file" });
    }

    const is_loaded =
      req.file && services.question_service.load_from_csv(req.file);

    if (is_loaded) {
      res.status(201).json({ message: "Questions loaded successfully" });
    } else {
      res.status(400).json({ message: "Question load failed" });
    }
  }

  async get_questions_by_category(req: Request, res: Response): Promise<void> {
    res
      .status(200)
      .json(await services.question_service.get_questions_by_category());
  }
}
