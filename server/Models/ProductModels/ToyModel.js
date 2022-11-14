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
const toyDetail = mongoose.Schema({
    //xuat xu
    origin: {
        type: String,
        required: true,
    },
    //chat lieu
    material: {
        type: String,
        required: true,
    },
    //kich thuoc
    size: {
        type: String,
        required: true,
    },
    //Khuyen nghi do tuoi
    applicationAge: {
        type: String,
        required: true,
    }

});
const toyProductSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,

            required: true,
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
            type: toyDetail,
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

const Toy = mongoose.model("Toy", toyProductSchema);

export default Toy;