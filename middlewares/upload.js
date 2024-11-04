import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const chartRoomImageUpload = multer({
    storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativPath: "/chart-room/*"
    }),
    preservePath: true
});