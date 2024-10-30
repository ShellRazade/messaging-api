import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userroutes.js";

await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database", error));

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);


app.listen(8000, () => {
    console.log("App is listening on port 8000");
});