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
// export const getAllRooms = async (req, res, next) => { 
//     try {
//         const rooms = await RoomModel.find()
//             .populate('user', 'username');  // Assuming you want to show room creator's username
//         res.status(200).json(rooms);
//     } catch (error) {
//         next(error);
//         res.status(500).json({ error: 'Failed to retrieve rooms' });
//     }
// };

export const getAllRooms = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 5, skip = 0 } = req.query;
        // Fetch all rooms
        const rooms = await RoomModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
            // Return a response
        res.status(200).json(rooms);  
    } catch (error) {
        next(error); 
        
    }
}

// Count all rooms
export const countRooms = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        // Count adverts in database
        const count = await RoomModel.countDocuments(JSON.parse(filter));
        // Return a response
        res.status(200).json(count);
    } catch (error) {
        next(error);
    }
}

// Get a room
export const getRoomById = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.params.id)
        if (!room) {
            return res.status(404).json({ error: "Room not found!" });
        }
        // Return a response
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

// Delete a room
export const deleteRoom = async (req, res, next) => {
    try {
        const room = await RoomModel.findOneAndDelete({
            _id: req.params.id,
            user: req.auth.id  // Only allow deletion by room creator
        });
        if (!room) {
            return res.status(404).json({ error: "Room not found or unauthorized!" });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        next(error);
    }
}
  










