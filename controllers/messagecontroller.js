import Message from './models/MessageModel.js';

export const getMessages = async (req, res, next) => {
    try {
        const { room } = req.params;
        const messages = await Message.find({ room })
            .populate("sender", "username")
            .sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};


export const postMessages = async (req, res, next) => {
    try {
        const { sender, content, room } = req.body;
        const newMessage = new Message({ sender, content, room });
        const savedMessage = await newMessage.save();

        res.status(201).json(savedMessage);
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to save message' });
    }
};


export const getMessageById = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        
        const message = await Message.findById(messageId)
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

        const updatedMessage = await Message.findByIdAndUpdate(
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

        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
};

