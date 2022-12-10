import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User"
  },
  cartItems: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Shoe Mobile BabyMom Toy Manclothes"
      },
      category: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      color: {
        type: String
      },
      size: {
        type: String
      }
    }
  ]
},
{
  timestamps: true
});
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
