import Express from "express";
import {configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";

export const app = Express();
//1.config dotenv
configDotenv({
  path:'./data/config.env'
});

//2. middlewares
app.use(Express.json());
app.use(cookieParser());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

//using errorMiddleware
app.use(errorMiddleware);
