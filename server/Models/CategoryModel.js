import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mapName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    iconImage: {
        type: String,
        default: "",
    }
},
{
    timestamps: true
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
