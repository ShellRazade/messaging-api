import { Router } from "express";
import { createRoom, deleteRoom, getAllRooms, getRoomById } from "../controllers/roomcontroller.js";
import { isauthenticated } from "../middlewares/auth.js";

const roomRouter = Router();

roomRouter.post("/rooms", isauthenticated, createRoom);

roomRouter.get("/rooms", isauthenticated, getAllRooms);
 
roomRouter.get("/rooms/:id", isauthenticated, getRoomById);

roomRouter.delete("/rooms/:id", isauthenticated, deleteRoom);

export default roomRouter; 