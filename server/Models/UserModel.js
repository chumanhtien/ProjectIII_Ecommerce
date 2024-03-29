import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type:String,
            required: true,
        },
        role: {
            // 1: admin, 2: nhan vien, 3: khach hang
            type: Number, 
            required: true,
            default: 3
        },
        // isAdmin: {
        //     type: Boolean,
        //     required: true,
        //     default: false
        // },
        isBlocked: {
            type: Boolean,
            required: true,
            default: false
        },
        listVouchers: [
            {
                voucherID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Voucher"
                },
                // number: {
                //     type: String
                // },
                // isUsed: {
                //     type: String
                // }
            }
        ]
    },
    {
        timestamps: true
    }
)
//LOGIN
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

//REGISTER
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;