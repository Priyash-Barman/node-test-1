import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { upload_single_file } from "../middlewares/multer.middleware";

const router = Router();
const user_controller = new UserController();

router.post("/user", user_controller.add_user);
router.post("/user-login", user_controller.user_login);
router
  .route("/user-profile")
  .get(user_controller.get_user_profile)
  .patch(
    upload_single_file("profile_picture"),
    user_controller.edit_user_profile
  );

export default router;
