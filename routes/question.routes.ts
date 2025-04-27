import { Router } from "express";
import { QuestionController } from "../controllers/question.controller";
import { upload_single_file } from "../middlewares/multer.middleware";

const router = Router();
const question_controller = new QuestionController();

router.get(
  "/category-questions",
  question_controller.get_questions_by_category
);
router.post(
  "/add-questions-csv",
  upload_single_file("questions_csv"),
  question_controller.add_questions_from_csv
);

export default router;
