import  Express  from "express";
import { newTask ,getAllTask,updateTask,deleteTask} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Express.Router();

router.post("/newTask",isAuthenticated,newTask)
router.get("/getAllTask",isAuthenticated,getAllTask);

router.route("/:taskId").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);
export default router;