import asyncHandler from "express-async-handler";
import Cart from "../Models/CartModel.js";
import User from "../Models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import moment from "moment"

export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // console.log(email, password)
    const user = await User.findOne({email});
    // console.log(user);

    if (user && (await user.matchPassword(password))) {
        if (user.isBlocked) {
            res.status(402);
            throw new Error(`Tài khoản của bạn đã bị Khóa vào ${moment(user.isBlockedAt).format("llll")}. Vui lòng quay lại sau!`)
        } else {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isBlocked: user.isBlocked,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            });
        }
    } else {
        res.status(401);
        if (!user) {
            throw new Error("Tài khoản Email này không tồn tại");
            // throw new Error("Username is not exist");
        }
        else if (!await user.matchPassword(password)) {
            throw new Error("Sai mật khẩu");
            // throw new Error("Wrong password");
        }
    }
})

export const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});
    
    if (userExist) {
        res.status(400);
        // throw new Error ("User is already exist")
        throw new Error ("Người dùng đã tồn tại");
    }
    const user = await User.create({
        name, 
        email, 
        password,
    });

    if (user) {
        const cart = await Cart.create({
            userID: user._id,
            cartItems: []
        })
        if (cart) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                cart: cart,
                createdAt: user.createdAt 
            });
        }
    }
    else {
        res.status(400);
        throw new Error ("Thông tin không hợp lệ");
        // throw new Error ("Invalid User Data");
    }
})

export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isBlocked: user.isBlocked,
            createdAt: user.createdAt,
        })
    } else {
        res.status(404);
        throw new Error ("Không tìm thấy người dùng");
    }
})

export const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password
        } 
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isBlocked: updatedUser.isBlocked,
            createdAt: updatedUser.createdAt,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error ("Không tìm thấy người dùng");
    }
})


//ADMIN
export const getAllUsersByAdmin = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i",
        },
    }
    : {};
    const users = await User.find({isAdmin: false, ...keyword});
    res.json(users);
})

export const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.isBlocked = true,
        user.isBlockedAt = Date.now();
        const userUpdated = user.save();
        res.json(userUpdated);
    } else {
        res.status(404);
        throw new Error("Không tìm thấy người dùng")
    }
})

export const unBlockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.isBlocked = false;
        const userUpdated = user.save();
        res.json(userUpdated);
    } else {
        res.status(404);
        throw new Error("Không tìm thấy người dùng")
    }
})

export const getUserProfileByAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isBlocked: user.isBlocked,
            createdAt: user.createdAt,
        })
    } else {
        res.status(404);
        throw new Error ("Không tìm thấy người dùng");
    }
})

export const editUserByAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password
        } 
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isBlocked: updatedUser.isBlocked,
            createdAt: updatedUser.createdAt,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error ("Không tìm thấy người dùng");
    }
})

export const addUserByAdmin = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});
    
    if (userExist) {
        res.status(400);
        // throw new Error ("User is already exist")
        throw new Error ("Email đã đăng ký cho Tài khoản khác");
    }

    const user = await User.create({
        name, 
        email, 
        password,
    });
    const cart = await Cart.create({
        userID: user._id,
        cartItems: []
    })
    if (cart) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            cart: cart,
            createdAt: user.createdAt 
        });
    }
    else {
        res.status(400);
        throw new Error ("Thông tin không hợp lệ");
        // throw new Error ("Invalid User Data");
    }
})  

export const deletedUserByAdmin = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
        const deletedUser = user;
        const cartUser = await Cart.findOne({ userID: user._id })
        if (cartUser) {
            await cartUser.remove(); 
        }
        else {
             throw new Error("Không tìm thấy Cart of user");
        }
        await user.remove();
        res.json({
            message: `Xóa thành công Người dùng ${user.name}`,
            deletedUser});
    } else {
        throw new Error("Không tìm thấy Người dùng");
    }
})