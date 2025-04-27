import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import services from "../services";
import { validate_payload } from "../decorators/validation.decorator";
import { LoginDto, UserDto } from "../dto/user.dto";
import { login_required } from "../decorators/auth.decorator";
import { save_uploaded_file } from "../utils/file.utils";

export class UserController {
  @validate_payload(UserDto)
  async add_user(req: Request, res: Response): Promise<void> {
    const payload: UserDto = req.body;
    const new_user = await services.user_service.add_user(payload);
    res.status(201).json(new_user);
  }

  @validate_payload(LoginDto)
  async user_login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const user = await services.user_service.find_user_by_email(email);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const is_valid_password = await services.user_service.validate_password(
      password,
      user.password
    );
    if (!is_valid_password) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  }

  @login_required
  async get_user_profile(req: Request, res: Response): Promise<void> {
    const user_id = (req as any).user_id;

    if (!user_id) {
      res.status(400).json({ message: "User ID not found in request" });
      return;
    }

    const user = await services.user_service.find_user_by_id(user_id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  }

  @login_required
  @validate_payload(UserDto)
  async edit_user_profile(req: Request, res: Response): Promise<void> {
    const user_id = (req as any).user_id;
    const update_data: UserDto = req.body;

    if (!user_id) {
      res.status(400).json({ message: "User ID not found in request" });
      return;
    }

    if (req.file) {
      const ext = req.file.originalname.split(".").pop();
      const filename = `user_${user_id}.${ext}`;
      update_data.profile_picture = save_uploaded_file(req.file, filename);
    }

    const updated_user = await services.user_service.update_user_profile(
      user_id,
      update_data
    );

    if (!updated_user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      ...updated_user._doc,
      profile_picture:
        updated_user.profile_picture &&
        `${req.protocol}://${req.get("host")}${updated_user.profile_picture}`,
    });
  }
}
