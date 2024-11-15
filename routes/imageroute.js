import { Router } from "express";
import { postImage } from "../controllers/imagecontroller.js";
import { chatRoomImageUpload } from "../middlewares/upload.js";
import { isauthenticated } from "../middlewares/auth.js";

// create router
const imageRouter = Router();

// POST images
imageRouter.post("/images", isauthenticated, chatRoomImageUpload.single("image"), postImage);

export default imageRouter;
