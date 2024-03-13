import ErrorHandler from "../middlewares/error.js";
import { Tasks } from "../modals/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description, isCompleted } = req.body;
    const task = await Tasks.create({
      title,
      description,
      isCompleted,
      user: req.user._id,
    });
    res.json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getAllTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Tasks.find({ user: userId });
    res.json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res,next) => {
  try {
    const { taskId } = req.params;
    const task = await Tasks.findById(taskId);
    if (!task) return next(new ErrorHandler("task not found", 404));
    await Tasks.findByIdAndUpdate(taskId, {
      isCompleted: !task.isCompleted,
    });
    //   task.isCompleted = !task.isCompleted;
    res.status(200).json({
      status: "success",
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Tasks.findById(taskId);
    if (!task) return next(new ErrorHandler("", 404));
    await task.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
