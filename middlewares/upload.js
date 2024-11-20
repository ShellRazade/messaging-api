import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// file upload
export const chatRoomImageUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/chat-room/files*",
    }),
    preservePath: true
});

// user profile
export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/chat-room/avatar*",
    }),
    preservePath: true
});
