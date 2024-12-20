import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
import userRouter from "./routes/userroutes.js";
import roomRouter from "./routes/roomroutes.js";
import messageRouter from "./routes/messageroute.js";
import imageRouter from "./routes/imageroute.js";

await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database", error));

const app = express();
// const server = http.createServer(app);
// const io = new server(server);

app.use(express.json());
app.use(cors());
app.use(userRouter, roomRouter, messageRouter, imageRouter);

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('sendMessage', async (messageData) => {
//         // Save message to the database
//         const message = await MessageModel.create(messageData);
//         io.to(messageData.room).emit('receiveMessage', message);  // Send to room
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

app.listen(8000, () => {
    console.log("App is listening on port 8000");
});