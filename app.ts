import express from "express";
import morgan from "morgan";
import router from "./routes";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config()

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/v1", router);

export default app;
