import {Router} from "express";
import { getProfile, updateUserProfile, userLogin, userLogout, userRegister } from "../controllers/usercontroller.js";
import { isauthenticated } from "../middlewares/auth.js";
import { userAvatarUpload } from "../middlewares/upload.js";


const userRouter = Router();

userRouter.post("/users/register", userRegister);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", isauthenticated, getProfile);

userRouter.patch("/users/update", isauthenticated, userAvatarUpload.single("avatar"), updateUserProfile);

userRouter.post("/users/logout", isauthenticated, userLogout);

export default userRouter;

