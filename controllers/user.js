import { Users } from "../modals/user.js";
import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";
export const getAllUser = async (req, res) => {
  const users = await Users.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};
export const getMyProfile = async (req, res) => {    
  res.status(200).json({
    status: "success",
    data: {
      user:req.user,
    },
  });
};
export const register = async (req, res,next) => {
  //1. get user inputs
  const { name, email, password } = req.body;

  //2. check if user exist or not
  const userExistOrNot = await Users.findOne({ email });
  if (userExistOrNot) {
    return next(new ErrorHandler("User already existed",404))
  }

  //3. create user with encrypt pass
  const hashedpass = await bcryptjs.hash(password, 10);
  const user = await Users.create({
    name,
    email,
    password: hashedpass,
  });

  //4. create send response with token in cookie to create session
  sendCookie(user, res, "user successfully created", 201);
};

export const login = async (req, res,next) => {
  const { email, password } = req.body;

  let findUser = await Users.findOne({ email }).select("+password");

  if (!findUser) {
    return next(new ErrorHandler("Invalid email and password",404))
  }

  const isValidPassword = await bcryptjs.compare(password, findUser.password);

  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid password",404))
  }
  sendCookie(findUser, res, `welcome back, ${findUser.name}`, 200);
};
export const logout = (req,res,next)=>{
  const {token} = req.cookies;
  
  if(!token){
    return next(new ErrorHandler("already logged out",404))
  }
  res.status(200).cookie("token",null,{
    expires:new Date(Date.now()),
    sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
    secure:process.env.NODE_ENV==="Development"?false:true
  }).json({
    status:"success",
    message:"logout successfully"
  })
};