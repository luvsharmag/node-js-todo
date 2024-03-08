import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.CONN_URI, {
      dbName: "backend",
    })
    .then(() => console.log("db connected"))
    .catch((e) => console.log(e));
};
