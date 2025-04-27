import { ICategory } from "../interfaces/category.interface";
import { Category } from "../models/category.model";

class CategoryService {
  async get_all_categories(): Promise<ICategory[]> {
    return await Category.aggregate([
      {
        $project: {
          name: 1,
        },
      },
    ]);
  }
}

export default CategoryService;
