import { RoomModel } from "../models/roommodels.js";
import { roomValidator } from "../validators/roomvalidator.js";

// Create a new room
export const createRoom = async (req, res, next) => {
    try {
        // Validate input
        const { error, value } = roomValidator.validate({
            ...req.body
        });
        if (error) {
            return res.status(422).json(error);
        }
        // write room to database
        await RoomModel.create({
            ...value,
            user: req.auth.id
        });
        // respond to request
        res.status(201).json("Room created successfully!");
    } catch (error) {
        next(error);
    }
}

// Get all rooms
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
};

// Delete a room
export const deleteRoom = async (req, res, next) => {
    try {
        const room = await RoomModel.findByIdAndDelete(
            {
                _id: req.params.id,
                user: req.auth.id
            }
        );
        if (!room) {
            return res.status(404).json("Room not found!");
        }
        res.status(200).json({ message: 'Room deleted!' });
    } catch (error) {
        next(error);
    }
}
