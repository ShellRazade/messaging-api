import { expressjwt } from "express-jwt";
import { UserModel } from "../models/usermodels.js";
// import { permissions } from "../utils/rbac.js";




export const isauthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"],
});

// export const hasPermissions = (action) => {
//     return async (req, res, next) => {
//       try {
//         const user = await UserModel.findById(req.auth.id);
//     const permission = permissions.find(value => value.role === user.role);
//         if (!permission) {
//           res.status(404).json("You are not authorized here");
//         }
//         if (permission.actions.includes(action)) {
//           next();
//         } else {
//             res.status(403).json("Action not Allowed");
//         }
//       } catch (error) {
//         next(error);
//       }
//     };
//   };
