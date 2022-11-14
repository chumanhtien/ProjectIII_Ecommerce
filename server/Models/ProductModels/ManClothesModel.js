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
const manclothesDetail = mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    //Chat lieu
    material: {
        type: String,
        required: true,
    },
    //xuat xu
    origin: {
        type: String,
        required: true,
    },

    sizes: [{
        type: String,
        required: true,
    }],
    colors: [{
        type: String,
        required: true,
    }],
    images_list: [
        {
            type: String,
        }
    ],
    
});
const manClothesProductSchema = mongoose.Schema({
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
            type: manclothesDetail,
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

const ManClothes = mongoose.model("ManClothes", manClothesProductSchema);

export default ManClothes;