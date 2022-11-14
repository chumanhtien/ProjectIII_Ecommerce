import mongoose from "mongoose";

const itemType = mongoose.Schema({
    size: {
        type: String,
    },
    color: {
        type: String,
    }
});
const orderSchema = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        orderItems: [
            {
                name: {type: String, required: true},
                qty: {type: Number, required: true},
                category: {type: String, required: true},
                image: {type: String, required: true},
                price: {type: String, required: true},
                types: {
                    type: itemType,
                },
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Shoe Mobile BabyMom Toy Manclothes",
                },
            },
        ],
        shippingAddress: {
            address: {type: String, required: true},
            phoneNumber: {type: String, required: true},
            city: {type: String, required: true},
            postalCode: {type: String, required: true},
            country: {type: String, required: true},
        },
        paymentMethod: {
            type: String,
            required: true,
            default: "Paypal",
        },
        paymentResult: {
            id: {type: String},
            status: {type: String},
            update_address: {type: String},
            email_address: {type: String},
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false
        },
        isConfirmed: {
            type: Boolean,
            required: true,
            default: false
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model("Order", orderSchema);

export default Order;