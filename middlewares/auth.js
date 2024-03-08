import jwt from "jsonwebtoken";
import { Users } from "../modals/user.js";
export const isAuthenticated = async (req,res,next) => {
  const { token } = req.cookies;
  if(!token){
    return res.status(404).json({
        status:'failed',
        message:'login first'
    });
  }
  const decrypted = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await Users.findById(decrypted._id);
  next();
};
