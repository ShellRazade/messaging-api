import { Router } from "express";
import { deleteMessages, getMessageById, getMessages, postMessages, updateMessages } from "../controllers/messagecontroller.js";
import { isauthenticated } from "../middlewares/auth.js";

const messageRouter = Router();

// POST a new message
messageRouter.post("/messages",isauthenticated, postMessages);

// GET messages for a specific room
messageRouter.get("/messages",isauthenticated, getMessages);

// GET a specific message
messageRouter.get("/message/:id",isauthenticated, getMessageById);

// UPDATE a specific message
messageRouter.patch('/message/:id',isauthenticated, updateMessages);

// DELETE a specific message
messageRouter.delete("/message/:id",isauthenticated, deleteMessages);

export default messageRouter;