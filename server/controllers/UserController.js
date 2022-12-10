import asyncHandler from "express-async-handler";

export default UserController = () => {
  const login = () =>
    asyncHandler(async (req, res) => {
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
}

