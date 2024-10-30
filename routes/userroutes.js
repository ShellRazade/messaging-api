import {Router} from "express";
import { getProfile, updateUserProfile, userLogin, userRegister } from "../controllers/usercontroller.js";



const userRouter = Router();

userRouter.post("/users/register", userRegister);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", getProfile);

userRouter.patch("/users/update", updateUserProfile);

export default userRouter;