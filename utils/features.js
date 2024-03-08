import jwt from "jsonwebtoken";
export function sendCookie(user,res,message,statusCode=200) {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 *1000),
      sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
      secure:process.env.NODE_ENV==="Development"?false:true
    })
    .json({
      status: "success",
      message: message,
    });
}

