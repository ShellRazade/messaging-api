import { Router } from "express";
import { deleteMessages, getAllMessages, getMessageById, postMessage, updateMessages } from "../controllers/messagecontroller.js";
import { isauthenticated } from "../middlewares/auth.js";

const messageRouter = Router();

// POST a new message
messageRouter.post("/messages", isauthenticated, postMessage);

// GET messages for a specific room
messageRouter.get("/messages", isauthenticated, getAllMessages);

// GET a specific message
messageRouter.get("/message/:id", isauthenticated, getMessageById);

// UPDATE a specific message
messageRouter.patch('/message/:id', isauthenticated, updateMessages);

// DELETE a specific message
messageRouter.delete("/message/:id", isauthenticated, deleteMessages);

export default messageRouter;