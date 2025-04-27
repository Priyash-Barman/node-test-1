import { Router } from "express";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes";
import questionRoutes from "./question.routes";

const router = Router();

// Registering routes
router.use("", userRoutes);
router.use("", categoryRoutes);
router.use("", questionRoutes);

export default router;
