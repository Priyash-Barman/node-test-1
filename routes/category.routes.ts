import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();
const category_controller = new CategoryController();

router.get("/categories", category_controller.get_all_categories);

export default router;
