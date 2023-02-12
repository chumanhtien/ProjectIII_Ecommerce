import mongoose from "mongoose";

const voucherSchema = mongoose.Schema({
    name: {
      type: String, 
      required: true,
    },
    type: {
      type: Number, //1: ship, 2: % vnd, 3: 000 vnd 
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
    maxValue: {
      type: Number,
      required: true,
      default: -1
    },
    minValueOfOrderRequire: {
      type: Number,
      required: true,
      default: -1
    },
    // typeApply: {
    //   type: Number,
    //   //1:Mobile , 2: Shoe, 3: Manclothes, 4: Toy, 5: Babymom, 6: All
    //   required: true,
    //   default: 6
    // },
    isActive: {
      type: Boolean,
      require: true, 
      default: false
    },
    expireAt: {
      type: Date,
      required: true,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
)

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;