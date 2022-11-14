import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String, 
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    }
});
const babymomDetail = mongoose.Schema({
    //xuat xu
    origin: {
        type: String,
        required: true,
    },
    //Thương hiệu
    brand: {
        type: String,
        required: true,
    },
    //hướng dẫn sử dụng
    manual: {
        type: String,
        required: true,
    },
    

});
const babymomProductSchema = mongoose.Schema({
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
            type: babymomDetail,
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

const BabyMom = mongoose.model("BabyMom", babymomProductSchema);

export default BabyMom;