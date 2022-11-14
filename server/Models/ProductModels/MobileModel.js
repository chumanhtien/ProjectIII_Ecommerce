import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
})
const mobileDetail = mongoose.Schema({
    screen: {
        type: String,
        required: true,
    },
    os: {
        type: String,
        required: true,
    },
    camera_front: {
        type: String,
        required: true,
    },
    camera_back: {
        type: String,
        required: true,
    },
    chip: {
        type: String,
        required: true,
    },
    RAM: {
        type: Number,
        required: true,
    },
    SIM: {
        type: String,
        required: true,
    },
    ROM: {
        type: Number,
        required: true,
    },
    pin_charge: {
        type: String,
        required: true,
    },
});
const mobileProductSchema = mongoose.Schema({
        category: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type:String,
            required: true,
        },
        productInfoDetail: {
            type: mobileDetail,
            required: true,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Mobile = mongoose.model("Mobile", mobileProductSchema);

export default Mobile;