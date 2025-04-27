import { UserDto } from "../dto/user.dto";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

class UserService {
  async add_user(data: UserDto) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    return await User.insertOne({ ...data });
  }

  async find_user_by_email(email: string): Promise<any> {
    return await User.findOne({ email });
  }

  async find_user_by_id(id: string): Promise<any> {
    return await User.findOne({ _id: id });
  }

  async validate_password(
    plain_password: string,
    hashed_password: string
  ): Promise<boolean> {
    return await bcrypt.compare(plain_password, hashed_password);
  }

  async update_user_profile(user_id: string, update_data: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    update_data.password = await bcrypt.hash(update_data.password, salt);
    return await User.findByIdAndUpdate(user_id, update_data, { new: true });
  }
}

export default UserService;
