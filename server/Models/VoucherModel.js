import mongoose from "mongoose";

const voucherSchema = mongoose.Schema({
    name: {
      type: String, 
      required: true,
    },
    type: {
      type: Number, //1: %, 2: 000 vnd
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    // number: {
    //   type: Number,
    //   required: true,
    // },
    expireAt: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;