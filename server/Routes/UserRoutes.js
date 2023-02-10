import express from "express";
import { protect, admin } from "../Middleware/AuthMiddleware.js"
import Cart from "../Models/CartModel.js";
import * as UserController from "../controllers/UserController.js";
const userRouter = express.Router();

// LOGIN
userRouter.post(
    "/login",
    UserController.login
);

// REGISTER
userRouter.post(
    "/register",
    UserController.register
);

// PROFILE
userRouter.get(
    "/profile",
    protect,
    UserController.getProfile
);

// UPDATE
userRouter.put(
    "/updateprofile",
    protect,
    UserController.updateProfile
);


// GET ALL USER ADMIN
userRouter.get(
    "/",
    protect,
    admin,
    UserController.getAllUsersByAdmin
);

//BLOCK USER
userRouter.put(
    "/:id/blocked",
    protect,
    admin,
    UserController.blockUser
)

//UNBLOCK USER
userRouter.put(
    "/:id/unblocked",
    protect,
    admin,
    UserController.unBlockUser
);

// GET USER PROFILE
userRouter.get(
    "/:id/profile",
    protect,
    admin,
    UserController.getUserProfileByAdmin
);

// ADMIN UPDATE PROFILE
userRouter.put(
    "/:id/editprofile",
    protect,
    admin,
    UserController.editUserByAdmin
);

//ADMIN ADD USER 
userRouter.post(
    "/admin/add",
    protect,
    admin,
    UserController.addUserByAdmin
)

//ADMIN DELETE USER 
userRouter.delete(
    "/:id/delete",
    protect,
    admin,
    UserController.deletedUserByAdmin
);

export default userRouter;
