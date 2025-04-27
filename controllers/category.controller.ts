import { Request, Response } from "express";
import services from "../services";

export class CategoryController {
  async get_all_categories(req: Request, res: Response): Promise<void> {
    res.status(200).json(await services.category_service.get_all_categories());
  }
}
