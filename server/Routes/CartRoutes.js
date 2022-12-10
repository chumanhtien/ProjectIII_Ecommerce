import express from "express";
import asyncHandler from "express-async-handler";
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
  asyncHandler(async (req, res) => {
    const { userID } = req.body;
    const lastCart = await Cart.findOne({ userID: userID })

    let cartInfoToLocal = {cartItems: []}
    if (lastCart) {
      if (lastCart.cartItems) {
        cartInfoToLocal.cartItems = await Promise.all(
          lastCart.cartItems.map(async (cartItem) => {
            const category = cartItem.category
            console.log(cartItem)
            let cartItemInfo = {}
            switch (category) {
              case 'shoes': {
                cartItemInfo = await Shoe.findById(cartItem.productID)
                break;
              }
              case 'mobiles': {
                cartItemInfo = await Mobile.findById(cartItem.productID)
                break;
              }
              case 'manclothes': {
                cartItemInfo = await ManClothes.findById(cartItem.productID);
                break;
              }
              case 'babymom': {
                cartItemInfo = await BabyMom.findById(cartItem.productID);
                break;
              }
              case 'toys': {
                cartItemInfo = await Toy.findById(cartItem.productID);
                break;
              }
            }
            if (cartItemInfo) {
              return {
                category: cartItem.category,
                productID: cartItem.productID,
                name: cartItemInfo.name,
                image: cartItemInfo.image,
                countInStock: cartItemInfo.countInStock,
                qty: cartItem.qty,
                types: {
                  size: cartItem.size,
                  color: cartItem.color
                }
              }
            }
          })
        )
        // res.json(lastCart)
      }
      res.json(cartInfoToLocal)
    }
  })
)

//SAVE CART TO DB
cartRouter.post(
  "/save",
  protect,
  asyncHandler(async (req, res) => {
    const { userID, cartItems } = req.body;
    // const cartItems = [
    //   {
    //     category: "shoes",
    //     countInStock: 100,
    //     image: "/images/shoes/4.png",
    //     name: "Sesame Street Unisex-Child ELMO Puppet Slipper",
    //     price: 929,
    //     productId: "628dbf26cbaf0ec946fb4e08",
    //     qty: 1,
    //     types: {size: "37", color: ""}
    //   }
    // ]

    if (cartItems) {
      let cartItemsToDB = cartItems.map((cartItem) => {
        return {
          productID: cartItem.productId,
          category: cartItem.category,
          qty: cartItem.qty,
          color: cartItem.types.color,
          size: cartItem.types.size
        }
      })
      
      let lastCart = await Cart.findOne({ userID: userID })
      if (lastCart) {
        lastCart.cartItems = cartItemsToDB
        await lastCart.save()
        if (lastCart) {
          res.json(lastCart)
        }
      }
      
    }
      
  })
)

export default cartRouter;