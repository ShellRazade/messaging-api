import {Router} from "express";
import { getProfile, updateUserProfile, userLogin, userLogout, userRegister } from "../controllers/usercontroller.js";
import { isauthenticated } from "../middlewares/auth.js";


const userRouter = Router();

userRouter.post("/users/register", userRegister);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", isauthenticated, getProfile);

userRouter.patch("/users/update", isauthenticated, updateUserProfile);

userRouter.post("/users/logout", isauthenticated, userLogout);

export default userRouter;

