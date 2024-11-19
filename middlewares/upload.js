import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const chatRoomImageUpload = multer({
    storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/chat-room/*",
    }),
    preservePath: true
});

