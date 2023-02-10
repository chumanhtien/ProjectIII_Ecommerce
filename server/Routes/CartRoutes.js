import express from "express";
import asyncHandler from "express-async-handler";
import * as CartController from "../controllers/CartController.js";
import { protect } from "../Middleware/AuthMiddleware.js";
import Cart from "../Models/CartModel.js";
import BabyMom from "../Models/ProductModels/BabyMomModel.js";
import ManClothes from "../Models/ProductModels/ManClothesModel.js";
import Mobile from "../Models/ProductModels/MobileModel.js";
import Shoe from "../Models/ProductModels/ShoeModel.js";
import Toy from "../Models/ProductModels/ToyModel.js";


const cartRouter = express.Router();

//TEST
cartRouter.get(
  "/hello",
  ((req, res) => {
    res.send("Hello, CART API is running")
  })
)

//GET CART 
cartRouter.get(
  "/",
  // protect,
  CartController.getCartOfUserLogin
)

//SAVE CART TO DB
cartRouter.post(
  "/save",
  protect,
  CartController.saveCartFromLocalStoragetoDB
)

export default cartRouter;