import { MessageModel } from "../models/messagemodel.js";
import { postMessageValidator, updateMessageValidator } from "../validators/messagevalidator.js";

export const postMessage = async (req, res, next) => {
    try {
        const { error, value } = postMessageValidator.validate({
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
        res.status(201).json("Message sent!");
    } catch (error) {
        next(error);

    }
};

export const getAllMessages = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query;
        // Get all messages
        const messages = await MessageModel
            .find(JSON.parse(filter))
            .populate("user")
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Respond to Request
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
}

export const getMessageById = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        // Get a specific message
        const message = await MessageModel.findById(messageId)
            .populate('username');

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        // Respond to Request
        res.status(200).json(message);
    } catch (error) {
        next(error);
    }
}

// Update an existing message
export const updateMessage = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        // Assuming you have an updateMessageValidator
        const { error, value } = updateMessageValidator.validate({
            ...req.body,
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Update message in database
        const updatedMessage = await MessageModel.findByIdAndUpdate(
            messageId,
            { ...value },
            { new: true }
        );
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        // Respond to Request
        res.status(200).json("Message updated successfully!");
    } catch (error) {
        next(error);
    }
}

// Delete a message
export const deleteMessage = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        // Delete message from database
        const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        // Respond to Request
        res.status(200).json("Message deleted successfully!");
    } catch (error) {
        next(error);
    }
}
