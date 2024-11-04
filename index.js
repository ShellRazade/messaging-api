import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/userroutes.js";

await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database", error));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(userRouter);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', async (messageData) => {
        // Save message to the database
        const message = await MessageModel.create(messageData);
        io.to(messageData.room).emit('receiveMessage', message);  // Send to room
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.listen(8000, () => {
    console.log("App is listening on port 8000");
});