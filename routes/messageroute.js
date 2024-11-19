import { Router } from "express";
import { deleteMessage, getAllMessages, getMessageById, postMessage, updateMessage } from "../controllers/messagecontroller.js";
import { isauthenticated } from "../middlewares/auth.js";

const messageRouter = Router();

// POST a new message
messageRouter.post("/messages", isauthenticated, postMessage);

// GET messages for a specific room
messageRouter.get("/messages", isauthenticated, getAllMessages);

// GET a specific message
messageRouter.get("/message/:id", isauthenticated, getMessageById);

// UPDATE a specific message
messageRouter.patch('/message/:id', isauthenticated, updateMessage);

// DELETE a specific message
messageRouter.delete("/message/:id", isauthenticated, deleteMessage);

export default messageRouter;