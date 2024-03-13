import Express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = Express();
//1.config dotenv
configDotenv({
  path: "./data/config.env",
});

//2. middlewares
app.use(Express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173",process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials:true,
}))

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

//using errorMiddleware
app.use(errorMiddleware);
