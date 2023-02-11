import express from "express";
import asyncHandler from "express-async-handler"
import users from './data/users.js';
import User from './Models/UserModel.js';
import Shoe from "./Models/ProductModels/ShoeModel.js";
import shoesProducts from "./data/Products/shoesProducts.js";
import Mobile from "./Models/ProductModels/MobileModel.js";
import Toy from "./Models/ProductModels/ToyModel.js"
import mobilesProducts from "./data/Products/mobilesProducts.js";
import toysProducts from "./data/Products/toys.js";
import Order from "./Models/OrderModel.js";
import ManClothes from "./Models/ProductModels/ManClothesModel.js";
import manclothesProducts from "./data/Products/manclothesProducts.js";
import BabyMom from "./Models/ProductModels/BabyMomModel.js";
import babymomProducts from "./data/Products/babymom.js";
import Category from "./Models/CategoryModel.js";
import categories from "./data/categoriesData.js";
import New from "./Models/NewModel.js";
import newsData from "./data/NewsData.js";
import Cart from "./Models/CartModel.js";
const ImportData = express.Router();

ImportData.post(
    "/users", 
    asyncHandler(async (req, res) => {
        await User.deleteMany({});
        // remove(): remove all document in collection in insert new 
        const importUser = await User.insertMany(users);
        if (importUser) {
            const listCarts = Promise.all(
                importUser.map((user) => {
                    Cart.create({
                        userID: user._id,
                        cartItems: []
                    })
                })
            )
        }
        res.send({importUser});
    })
);

//IMPORT MOBILES DATA
ImportData.post(
    "/products/mobiles", 
    asyncHandler(async (req, res) => {
        await Mobile.deleteMany({});
        const importmobilesProduct = await Mobile.insertMany(mobilesProducts);
        res.send({importmobilesProduct})
    })
);

//IMPORT SHOES DATA
ImportData.post(
    "/products/shoes", 
    asyncHandler(async (req, res) => {
        await Shoe.deleteMany({});
        const importshoesProduct = await Shoe.insertMany(shoesProducts);
        res.send({importshoesProduct})
    })
);

//IMPORT MANCLOTHES DATA
ImportData.post(
    "/products/manclothes", 
    asyncHandler(async (req, res) => {
        await ManClothes.deleteMany({});
        const importManclothesProduct = await ManClothes.insertMany(manclothesProducts);
        res.send({importManclothesProduct});
    })
);

//IMPORT TOYS DATA
ImportData.post(
    "/products/toys", 
    asyncHandler(async (req, res) => {
        await Toy.deleteMany({});
        const importtoysProduct = await Toy.insertMany(toysProducts);
        res.send({importtoysProduct})
    })
);

//IMPORT TOYS DATA
ImportData.post(
    "/products/babymom", 
    asyncHandler(async (req, res) => {
        await BabyMom.deleteMany({});
        const importtoysProduct = await BabyMom.insertMany(babymomProducts);
        res.send({importtoysProduct})
    })
);

//DELETE ALL ORDERS 
ImportData.post(
    "/delete/all/orders", 
    asyncHandler(async (req, res) => {
        await Order.deleteMany({});
        // remove(): remove all document in collection in insert new 
        // const importUser = await User.insertMany(users);
        res.send("Delete All Orders Success!");
    })
);


//IMPORT CATEGORIES
ImportData.post(
    "/categories", 
    asyncHandler(async (req, res) => {
        await Category.deleteMany({});
        const categoriesData = await Category.insertMany(categories);
        res.send({categoriesData})
    })
);

//IMPORT NEWS
ImportData.post(
    "/news",
    asyncHandler(async (req, res) => {
        await New.deleteMany({});
        const news = await New.insertMany(newsData);
        res.send({news});
    })
)


export default ImportData;