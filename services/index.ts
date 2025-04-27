import CategoryService from "./category.service";
import QuestionService from "./question.service";
import UserService from "./user.service";

const services = {
  user_service: new UserService(),
  category_service: new CategoryService(),
  question_service: new QuestionService(),
};

export default services;
