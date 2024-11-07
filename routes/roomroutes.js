import { Router } from "express";
import { createRoom, deleteRoom, getAllRooms } from "../controllers/roomcontroller.js";
import { isauthenticated } from "../middlewares/auth.js";

const roomRouter = Router();

roomRouter.post("/rooms", isauthenticated, createRoom);

roomRouter.get("/rooms", isauthenticated, getAllRooms);

roomRouter.delete("/rooms/:id", isauthenticated, deleteRoom);

export default roomRouter; 