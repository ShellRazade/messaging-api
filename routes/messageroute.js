import { Router } from "express";
import { deleteMessages, getMessageById, getMessages, postMessages, updateMessages } from "../controllers/messagecontroller";

const messagerouter = Router();

// POST a new message
messagerouter.post("/messages", postMessages);

// GET messages for a specific room
messagerouter.get("/messages", getMessages);

// GET a specific message
messagerouter.get("/message/:id", getMessageById);

// UPDATE a specific message
messagerouter.patch('/message/:id', updateMessages);

// DELETE a specific message
messagerouter.delete("/message/:id", deleteMessages);

export default messagerouter;