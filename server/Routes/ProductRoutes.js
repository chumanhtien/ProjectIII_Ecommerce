import express from "express";
import asyncHandler from "express-async-handler";
import Shoe from "../Models/ProductModels/ShoeModel.js";
import Mobile from "../Models/ProductModels/MobileModel.js";
import ManClothes from "../Models/ProductModels/ManClothesModel.js";
import Toy from "../Models/ProductModels/ToyModel.js";
import BabyMom from "../Models/ProductModels/BabyMomModel.js";
import {admin, protect} from "../Middleware/AuthMiddleware.js"
import Order from "../Models/OrderModel.js";
import Category from "../Models/CategoryModel.js";
import New from "../Models/NewModel.js";
import * as ProductController from "../controllers/ProductController.js";

const productRouter = express.Router();

//
const shuffleArray = (array) => { 
    for (var i = array.length - 1; i > 0; i--) {  
        var j = Math.floor(Math.random() * (i + 1)); 
        var temp = array[i]; 
        array[i] = array[j]; 
        array[j] = temp; 
    } 
    return array; 
} 
//PAGE SIZE
const PAGE_SIZE = 3;

//GET ALL
productRouter.get(
    "/",
    ProductController.getAllProducts
)

//GET ALL CATEGORIES
productRouter.get(
    "/categories",
    asyncHandler(async (req, res) => {
        const categories = await Category.find({});
        res.json(categories);
    })
)

//GET ALL SHOES PRODUCTS
productRouter.get(
    "/shoes",
    ProductController.getAllShoeProducts
);

//GET SINGLE SHOE PRODUCTS
productRouter.get(
    "/shoes/:id",
    ProductController.getShoeById
);

//GET ALL MOBILES PRODUCTS
productRouter.get(
    "/mobiles",
    ProductController.getAllMobileProducts
);

//GET SINGLE MOBILE PRODUCTS
productRouter.get(
    "/mobiles/:id",
    ProductController.getMobileById
);

//GET ALL MANCLOTHES PRODUCTS
productRouter.get(
    "/manclothes",
    ProductController.getAllManclothesProducts
);

//GET SINGLE MANCLOTHES PRODUCTS
productRouter.get(
    "/manclothes/:id",
    ProductController.getManclothesById
);

//GET ALL TOYS PRODUCTS
productRouter.get(
    "/toys",
    ProductController.getAllToyProducts
);

//GET SINGLE TOY PRODUCTS
productRouter.get(
    "/toys/:id",
    ProductController.getToyById
);

//GET ALL BABYMOM PRODUCTS
productRouter.get(
    "/babymom",
    ProductController.getAllBabymomProducts
);

//GET SINGLE BABYMOM PRODUCTS
productRouter.get(
    "/babymom/:id",
    ProductController.getBabymomById
);

//PRODUCT REVIEW
productRouter.post(
  `/:id/review`,
//   `/:category/:id/review`,
  protect,
  ProductController.reviewProduct
)

//ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PAGINATION
productRouter.get(
    "/admin/all", 
    protect, 
    admin, 
    ProductController.getAllProductsByAdmin
);


//DELETE PRODUCT BY ID
productRouter.delete(
    "/delete/:category/:id",
    protect,
    admin,
    ProductController.deleteProductByCategory
);

//CREATE SHOES PRODUCT
productRouter.post(
    "/shoes/create",
    protect,
    admin,
    ProductController.createShoeProduct
);

//CREATE MOBILES PRODUCT
productRouter.post(
    "/mobiles/create",
    protect,
    admin,
    ProductController.createMobileProduct
);

//CREATE MANCLOTHES PRODUCT
productRouter.post(
    "/manclothes/create",
    protect,
    admin,
    ProductController.createManclothesProduct
);

//CREATE TOYS PRODUCT
productRouter.post(
    "/toys/create",
    protect,
    admin,
    ProductController.createToyProduct
);

//CREATE BABYMOM PRODUCT
productRouter.post(
    "/babymom/create",
    protect,
    admin,
    ProductController.createBabymomProduct
);

//EDIT SHOES PRODUCT
productRouter.put(
    "/shoes/edit/:id",
    protect,
    admin,
    ProductController.editShoeProduct
);

//EDIT MOBILES PRODUCT
productRouter.put(
    "/mobiles/edit/:id",
    protect,
    admin,
    ProductController.editMobileProduct
);

//EDIT MANCLOTHES PRODUCT
productRouter.put(
    "/manclothes/edit/:id",
    protect,
    admin,
    ProductController.editManclothesProduct
);

//EDIT TOYS PRODUCT
productRouter.put(
    "/toys/edit/:id",
    protect,
    admin,
    ProductController.editToyProduct
);

//EDIT BABYMOM PRODUCT
productRouter.put(
    "/babymom/edit/:id",
    protect,
    admin,
    ProductController.editBabymomProduct
);

//GET CATEGORY BY ID
productRouter.get(
    "/category/:id/",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category)
        } else {
            res.status(404);
            throw new Error ("Không tìm thấy Category");
        }
    })
);

// UPDATE CATEGORY BY ID
productRouter.put(
    "/category/:id/edit",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (category) {
            category.mapName = req.body.mapName || category.mapName;
            category.description = req.body.description || category.description;
            category.iconImage = req.body.iconImage || category.iconImage;
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404);
            throw new Error ("Không tìm thấy Category");
        }
    })
);

// ADD CATEGORY 
productRouter.post(
    "/category/add",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name, mapName, description, iconImage} = req.body;
        const categoryExist = await Category.findOne({name});
        
        if (categoryExist) {
            res.status(400);
            // throw new Error ("User is already exist")
            throw new Error (`Đã tồn tại Category có tên ${name} rồi`);
        }

        const category = await Category.create({
            name, 
            mapName, 
            description,
            iconImage,
        });

        if (category) {
            res.status(201).json({
                _id: category._id,
                name: category.name,
                mapName: category.mapName,
                description: category.description,
                iconImage: category.iconImage,
                createdAt: category.createdAt,
            });
        }
        else {
            res.status(400);
            throw new Error ("Thông tin không hợp lệ");
            // throw new Error ("Invalid User Data");
        }
    })  
)

//ADMIN DELETE CATEGORY 
productRouter.delete(
    "/category/:id/delete",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (category) {
            const deletedCategory = category;
            await category.remove();
            res.json({
                message: `Xóa thành công Category ${category.name}`,
                deletedCategory});
        } else {
            throw new Error("Không tìm thấy Category");
        }
    })
);

//GET ALL NEWS
productRouter.get(
    "/news",
    asyncHandler(async (req, res) => {
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        const newsList = await New.find({...keyword});
        // console.log("New List: ",newsList);
        // const newsList = await New.find({});
        res.json(newsList);
    })
);

//GET SINGLE NEWS
productRouter.get(
    "/news/:id",
    asyncHandler(async (req, res) => {
        const singleNew = await New.findById(req.params.id);
        if (singleNew)  {
            if (singleNew.source.id === 'noibo') {
                res.json(singleNew);
            } else {
                res.json({
                    singleNew,
                    message: "Không phải Tin tức nội bộ"
                });
            }
        } else {
            res.status(404);
            throw new Error("New Not Found");
        }
    })
);

//ADMIN GET ALL NEWS
productRouter.get(
    "/admin/news", 
    protect, 
    admin, 
    asyncHandler(async (req, res) => {     
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        const newsList = await New.find({...keyword});
        res.json(newsList);
    })
);

//CREATE NEWS PRODUCT
productRouter.post(
    "/news/add",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {source, title, author, description, content, url, urlToImage} = req.body;
        const newsExist = await New.findOne({title});
        if (newsExist) {
            res.status(404);
            throw new Error("Tin tức với tiêu đề trên đã tồn tại");
        } else {
            const newsCreate = new New ({
                source, 
                title, 
                author, 
                description, 
                content, 
                url,
                urlToImage,
                publishedAt: Date.now(),
                user: req.user._id,
            })
            if (newsCreate) {
                const createdNews = await newsCreate.save();
                res.status(201).json(createdNews);
            } else {
                res.status(400);
                throw new Error("Dữ liệu Tin tức không hợp lệ");
            }
            
        }
    })
);

//ADMIN DELETE A NEWS
productRouter.delete(
    "/news/:id/delete",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const newDelete = await New.findById(id);
        if (newDelete) {
            const deletedNews = newDelete;
            await newDelete.remove();
            res.json({
                message: `Xóa thành công Tin tức với tiêu đề ${deletedNews.title}`,
                deletedNews});
        } else {
            throw new Error("Không tìm thấy Tin tức");
        }
    })
);

export default productRouter;