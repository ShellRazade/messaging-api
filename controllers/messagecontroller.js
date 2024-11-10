import { MessageModel } from "../models/messagemodel.js";
import { postMessageValidator } from "../validators/messagevalidator.js";

export const postMessage = async (req, res, next) => {
    try {
        const { error,value} = postMessageValidator.validate({
            ...req.body,
        });
        if (error) {
            return res.status(422).json(error);
        }

        // write  Message to database
        await MessageModel.create({
            ...value,
            user: req.auth.id
        });
        
        // Respond to Request
        res.status(201).json("sent");
    } catch (error) {
        next(error);
      
    }
};


export const getMessages = async (req, res, next) => {
    try {
        const { sender, content, room } = req.body;
        const newMessage = new MessageModel
        ({ sender, content, room });
        const savedMessage = await newMessage.save();

        res.status(201).json(savedMessage);
    } catch (error) {
        next(error);
    }
};


export const getMessageById = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        
        const message = await MessageModel.findById(messageId)
            .populate('sender', 'username');  // Populating sender's username like in getMessages
        
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json(message);
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to retrieve message' });
    }
};

// Update an existing message
export const updateMessages = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        const { content } = req.body;

        const updatedMessage = await MessageModel.findByIdAndUpdate(
            messageId,
            { content },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to update message' });
    }
};

// Delete a message
export const deleteMessages = async (req, res, next) => {
    try {
        const { messageId } = req.params;

        const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
};

