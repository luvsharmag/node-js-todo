import Express from "express";
import { register,login, getAllUser, getMyProfile,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Express.Router();

router.get("/users",getAllUser);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, getMyProfile);
router.post("/logout",logout);

export default router;
