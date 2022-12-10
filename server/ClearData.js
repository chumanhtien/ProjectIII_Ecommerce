import express from "express";
import asyncHandler from "express-async-handler";
import Cart from "./Models/CartModel.js";

const ClearData = express.Router();
ClearData.delete(
  "/cart",
  asyncHandler(async (req, res) => {
    await Cart.deleteMany({})
  })
)


export default ClearData;