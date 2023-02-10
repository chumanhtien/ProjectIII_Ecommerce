import express from "express";
import asyncHandler from "express-async-handler";
import Cart from "./Models/CartModel.js";
import Mobile from "./Models/ProductModels/MobileModel.js"
const ClearData = express.Router();
ClearData.delete(
  "/cart",
  asyncHandler(async (req, res) => {
    await Cart.deleteMany({})
    res.send(200).json("Xóa Cart thành công")
  })
)

ClearData.delete(
  "/products/mobile",
  asyncHandler(async (req, res) => {
    await Mobile.deleteMany({})
    res.send(200).json("Xóa Mobile thành công")
  })
)

ClearData.delete(
  "/products",
  asyncHandler(async (req, res) => {

  })
)

export default ClearData;