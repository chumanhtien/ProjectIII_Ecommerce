import asyncHandler from "express-async-handler";
import Cart from "../Models/CartModel.js";
import BabyMom from "../Models/ProductModels/BabyMomModel.js";
import ManClothes from "../Models/ProductModels/ManClothesModel.js";
import Mobile from "../Models/ProductModels/MobileModel.js";
import Shoe from "../Models/ProductModels/ShoeModel.js";
import Toy from "../Models/ProductModels/ToyModel.js";


export const getCartOfUserLogin = asyncHandler(async (req, res) => {
  const userID = req.body;
  const lastCart = await Cart.findOne({...userID})

  let cartInfoToLocal = {cartItems: []}
  if (lastCart) {
    if (lastCart.cartItems) {
      cartInfoToLocal.cartItems = await Promise.all(
        lastCart.cartItems.map(async (cartItem) => {
          const category = cartItem.category
          // console.log(cartItem)
          let cartItemInfo = {}
          switch (category) {
            case 'shoes': {
              cartItemInfo = await Shoe.findById(cartItem.productId)
              break;
            }
            case 'mobiles': {
              cartItemInfo = await Mobile.findById(cartItem.productId)
              break;
            }
            case 'manclothes': {
              cartItemInfo = await ManClothes.findById(cartItem.productId);
              break;
            }
            case 'babymom': {
              cartItemInfo = await BabyMom.findById(cartItem.productId);
              break;
            }
            case 'toys': {
              cartItemInfo = await Toy.findById(cartItem.productId);
              break;
            }
          }
          if (cartItemInfo) {
            return {
              category: cartItem.category,
              productId: cartItem.productId,
              name: cartItemInfo.name,
              image: cartItemInfo.image,
              price: cartItemInfo.price,
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
    // res.json(lastCart)
  } else {
    res.status(404)
    throw new Error ("Lỗi, không tìm thấy thông tin Cart")
  }
})

export const saveCartFromLocalStoragetoDB = asyncHandler(async (req, res) => {
  try {
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
      // console.log(cartItems);
      let cartItemsToDB = cartItems.map((cartItem) => {
        return {
          productId: cartItem.productId,
          category: cartItem.category,
          //name: cartItem.name,
          //image: cartItem.image
          qty: cartItem.qty,
          color: cartItem.types.color,
          size: cartItem.types.size
        }
      })
      
      let lastCart = await Cart.findOne({ userID: userID })
      if (lastCart) {
        lastCart.cartItems = cartItemsToDB
        lastCart.save()
        if (lastCart) {
          res.json(lastCart)
        } else {
          res.status(403);
          throw Error("Lỗi không thể lưu cartItems to DB")
        }
      }
      
    }
  } catch (error) {
    // console.log(error.response.data.message)
    res.status(401);
    throw new Error("Lỗi: ", error.response.data.message)
  }
    
})