import mongoose from "mongoose";


const newSchema = mongoose.Schema({
        source: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
        },
        author: {
            type: String,
            required: true,
            default: "No Name"
        },
        title: {
            type:String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            default: "/news/noibo",
        },
        urlToImage: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
            default: "No Content"
        },
        publishedAt: {
            type: Date,
            // required: true,
            default: Date.now(),
        }
    },
    {
        timestamps: true
    }
)

const New = mongoose.model("New", newSchema);

export default New;