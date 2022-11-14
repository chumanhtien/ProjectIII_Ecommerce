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
const productRoute = express.Router();

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
productRoute.get(
    "/",
    asyncHandler(async (req, res) => {
        const pageSize = 2 * PAGE_SIZE;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        
        const countShoe = await Shoe.countDocuments({...keyword});
        const countMobile = await Mobile.countDocuments({...keyword});
        const countManClothes = await ManClothes.countDocuments({...keyword});
        const countToys = await Toy.countDocuments({...keyword});
        const countBabymom = await BabyMom.countDocuments({...keyword});
        
        
        const count = countShoe + countMobile + countManClothes + countToys + countBabymom;
        
        const shoesProducts = await Shoe.find({...keyword});
        const mobilesProducts = await Mobile.find({...keyword});
        const manClothesProducts = await ManClothes.find({...keyword});
        const toysProducts = await Toy.find({...keyword});
        const babymomProducts = await BabyMom.find({...keyword});


        let products = [];
        products.push(...shoesProducts);
        products.push(...mobilesProducts);
        products.push(...manClothesProducts);
        products.push(...toysProducts);
        products.push(...babymomProducts);
        products = shuffleArray(products);

        products = products.slice(pageSize * (page - 1), pageSize * page);
            // .limit(pageSize)
            // .skip(pageSize * (page - 1))
            // .sort({_id: -1});
        // console.log(products)
            
        
        res.json({products, page, pages: Math.ceil(count / pageSize)});
    })
)

//GET ALL CATEGORIES
productRoute.get(
    "/categories",
    asyncHandler(async (req, res) => {
        const categories = await Category.find({});
        res.json(categories);
    })
)

//GET ALL SHOES PRODUCTS
productRoute.get(
    "/shoes",
    asyncHandler(async (req, res) => {
        const pageSize = PAGE_SIZE;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        
        const count = await Shoe.countDocuments({...keyword});

        const shoesProducts = await Shoe.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1) )
            .sort({_id: -1});

        // products = products.slice(pageSize * (page - 1), pageSize * page);
        
        res.json({shoesProducts, page, pages: Math.ceil(1.0 * count / pageSize)});
    })
);

//GET SINGLE SHOE PRODUCTS
productRoute.get(
    "/shoes/:id",
    asyncHandler(async (req, res) => {
        const singleShoeProduct = await Shoe.findById(req.params.id);
        if (singleShoeProduct)  {
            res.json(singleShoeProduct);
        } else {
            res.status(404);
            throw new Error("Shoe Product Not Found");
        }
    })
);

//GET ALL MOBILES PRODUCTS
productRoute.get(
    "/mobiles",
    asyncHandler(async (req, res) => {
        const pageSize = PAGE_SIZE;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        const count = await Mobile.countDocuments({...keyword});
        const mobilesProducts = await Mobile.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1) )
            .sort({_id: -1});
        res.json({mobilesProducts, page, pages: Math.ceil(1.0 * count / pageSize)});
    })
);

//GET SINGLE MOBILE PRODUCTS
productRoute.get(
    "/mobiles/:id",
    asyncHandler(async (req, res) => {
        const singleMobileProduct = await Mobile.findById(req.params.id);
        if (singleMobileProduct)  {
            res.json(singleMobileProduct);
        } else {
            res.status(404);
            throw new Error("Mobile Product Not Found");
        }
    })
);

//GET ALL MANCLOTHES PRODUCTS
productRoute.get(
    "/manclothes",
    asyncHandler(async (req, res) => {
        const pageSize = PAGE_SIZE;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        
        const count = await ManClothes.countDocuments({...keyword});

        const manClothesProducts = await ManClothes.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1) )
            .sort({_id: -1});

        // products = products.slice(pageSize * (page - 1), pageSize * page);
        
        res.json({manClothesProducts, page, pages: Math.ceil(1.0 * count / pageSize)});
    })
);

//GET SINGLE MANCLOTHES PRODUCTS
productRoute.get(
    "/manclothes/:id",
    asyncHandler(async (req, res) => {
        const singleManClothesProduct = await ManClothes.findById(req.params.id);
        if (singleManClothesProduct)  {
            res.json(singleManClothesProduct);
        } else {
            res.status(404);
            throw new Error("ManClothes Product Not Found");
        }
    })
);

//GET ALL TOYS PRODUCTS
productRoute.get(
    "/toys",
    asyncHandler(async (req, res) => {
        const pageSize = PAGE_SIZE;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        
        const count = await Toy.countDocuments({...keyword});

        const toysProducts = await Toy.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1) )
            .sort({_id: -1});

        // products = products.slice(pageSize * (page - 1), pageSize * page);
        
        res.json({toysProducts, page, pages: Math.ceil(1.0 * count / pageSize)});
    })
);

//GET SINGLE TOY PRODUCTS
productRoute.get(
    "/toys/:id",
    asyncHandler(async (req, res) => {
        const singleShoeProduct = await Toy.findById(req.params.id);
        if (singleShoeProduct)  {
            res.json(singleShoeProduct);
        } else {
            res.status(404);
            throw new Error("Toy Product Not Found");
        }
    })
);

//GET ALL BABYMOM PRODUCTS
productRoute.get(
    "/babymom",
    asyncHandler(async (req, res) => {
        const pageSize = PAGE_SIZE;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
        
        const count = await BabyMom.countDocuments({...keyword});

        const babymomProducts = await BabyMom.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1) )
            .sort({_id: -1});

        // products = products.slice(pageSize * (page - 1), pageSize * page);
        
        res.json({babymomProducts, page, pages: Math.ceil(1.0 * count / pageSize)});
    })
);

//GET SINGLE BABYMOM PRODUCTS
productRoute.get(
    "/babymom/:id",
    asyncHandler(async (req, res) => {
        const singleShoeProduct = await BabyMom.findById(req.params.id);
        if (singleShoeProduct)  {
            res.json(singleShoeProduct);
        } else {
            res.status(404);
            throw new Error("BabyMom Product Not Found");
        }
    })
);

//PRODUCT REVIEW
productRoute.post(
  `/:id/review`,
//   `/:category/:id/review`,
  protect,
  asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    // const id = req.params.id;
    // console.log("id", id);
    if (!rating || !comment) {
        throw new Error ("Vui lòng điền đầy đủ thông tin Đánh giá sản phẩm!");
    }
    //   const product = {};

    //   switch(req.body.category) {
    //     case "mobiles":
    //         product = await Mobile.findById(req.body.id);
    //         break;
    //     case "shoes": 
    //         product = await Shoe.findById(req.body.id);
    //         break;
    //     case "manclothes":
    //         product = await ManClothes.findById(req.body.id);
    //         break;
    //     case "babymom":
    //         product = await BabyMom.findById(req.body.id);
    //         break;
    //     case "toy":
    //         product = await Toy.findById(req.body.id);
    //         break;
        
    //   }
    const product = await (await Mobile.findById(req.params.id) || await Shoe.findById(req.params.id)
                        || await ManClothes.findById(req.params.id) || await BabyMom.findById(req.params.id)
                        || await Toy.findById(req.params.id));
    // if (product)
    //     console.log(product);

    const orders = await Order.find({});


    //Danh gia binh thuong
    // let orderHaveProduct = true;

    //Kich Hoat: Mua moi duoc danh gia
    let orderHaveProduct = false;
    if (orders) {
        for (let i = 0; i < orders.length; i ++) {
            if (orders[i].isDelivered) {
                let orderItems = orders[i].orderItems;
                for (let j = 0; j < orderItems.length; j++) {
                    // console.log(orderItems[j].productId.toString());
                    // console.log("productId: ", product._id);
                    // let {productId} = orderItems[j].productId;
                    // console.log(productId);
                    if (orderItems[j].productId.toString() === product._id.toString()) {
                        orderHaveProduct = true;
                        break;
                    }   
                }
            } 
        }
    }
    if (product) {
        if (orderHaveProduct) {
            // console.log("userId: ", req.user._id);
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
                )
            //   if (alreadyReviewed) {
            //     res.status(400);
            //     throw new Error("Product already Reviewd");
            //   }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
                createdAt: Date.now(),
            }
            if (alreadyReviewed) {
                product.reviews.remove(alreadyReviewed);
            }
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            
            await product.save();
            if (alreadyReviewed) {
                res.status(202).json({message: "Review has already been Updated"});
            }
            else {
                res.status(201).json({message:  "Review has already been Added"});
            }
        } else {
            res.status(404);
            throw new Error("Bạn chỉ có thể đánh giá khi ĐÃ MUA sản phẩm này!");
        }
        
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
  })
)

//ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PAGINATION
productRoute.get(
    "/admin/all", 
    protect, 
    admin, 
    asyncHandler(async (req, res) => {
        // const pageSize = 8;
        // const page = Number(req.query.pageNumber) || 1;

        // const keyword = req.query.keyword ? {
        //     name: {
        //         $regex: req.query.keyword,
        //         $options: "i",
        //     },
        // }
        // : {};

        // const keyword = {};

        // const countShoe = await Shoe.countDocuments({...keyword});
        // const countMobile = await Mobile.countDocuments({...keyword});
        // const countManClothes = await ManClothes.countDocuments({...keyword});
        // const countToys = await Toy.countDocuments({...keyword});
        // const countBabymom = await BabyMom.countDocuments({...keyword});
        
        
        // const count = countShoe + countMobile + countManClothes + countToys + countBabymom;
        
        // const shoesProducts = await Shoe.find({...keyword});
        // const mobilesProducts = await Mobile.find({...keyword});
        // const manClothesProducts = await ManClothes.find({...keyword});
        // const toysProducts = await Toy.find({...keyword});
        // const babymomProducts = await BabyMom.find({...keyword});
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};

        const shoesProducts = await Shoe.find({...keyword});
        const mobilesProducts = await Mobile.find({...keyword});
        const manClothesProducts = await ManClothes.find({...keyword});
        const toysProducts = await Toy.find({...keyword});
        const babymomProducts = await BabyMom.find({...keyword});
        let products = [];
        products.push(...shoesProducts);
        products.push(...mobilesProducts);
        products.push(...manClothesProducts);
        products.push(...toysProducts);
        products.push(...babymomProducts);
        res.json({products, shoesProducts, mobilesProducts, manClothesProducts, babymomProducts, toysProducts});
    })
);


//DELETE PRODUCT BY ID
productRoute.delete(
    "/delete/:category/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const productCategory = req.params.category;
        let product = {};
        switch (productCategory) {
            case "mobiles":
                product = await Mobile.findById(req.params.id);
                break;
            case "shoes":
                product = await Shoe.findById(req.params.id);
                break;
            case "manclothes":
                product = await ManClothes.findById(req.params.id);
                break;
            case "toys":
                product = await Toy.findById(req.params.id);
                break;
            case "babymom":
                product = await BabyMom.findById(req.params.id);
        }
        if (product) {
            const deletedProduct = product;
            await product.remove();
            res.json({
                message: `Xóa thành công sản phẩm ${deletedProduct.name}`,
                deletedProduct});
        } else {
            throw new Error("Không tìm thấy sản phẩm");
        }
    })
);

//CREATE SHOES PRODUCT
productRoute.post(
    "/shoes/create",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {category, name, image, productInfoDetail, description, price, countInStock} = req.body;
        const productExist = await Shoe.findOne({name});

        if (productExist) {
            res.status(404);
            throw new Error("Sản phẩm Giày dép này đã tồn tại");
        } else {
            const shoeProduct = new Shoe({
                category, 
                name, 
                image, 
                productInfoDetail, 
                description, 
                price, 
                countInStock,
                user: req.user._id,
            })
            if (shoeProduct) {
                const createdProduct = await shoeProduct.save();
                res.status(201).json(createdProduct);
            } else {
                res.status(400);
                throw new Error("Dữ liệu sản phẩm không hợp lệ");
            }
            

        }
    })
);

//CREATE MOBILES PRODUCT
productRoute.post(
    "/mobiles/create",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {category, name, image, productInfoDetail, description, price, countInStock} = req.body;
        const productExist = await Mobile.findOne({name});

        if (productExist) {
            res.status(404);
            throw new Error("Sản phẩm Điện thoại này đã tồn tại");
        } else {
            const mobileProduct = new Mobile({
                category, 
                name, 
                image, 
                productInfoDetail, 
                description, 
                price, 
                countInStock,
                user: req.user._id,
            })
            if (mobileProduct) {
                const createdProduct = await mobileProduct.save();
                res.status(201).json(createdProduct);
            } else {
                res.status(400);
                throw new Error("Dữ liệu sản phẩm không hợp lệ");
            }
            

        }
    })
);

//CREATE MANCLOTHES PRODUCT
productRoute.post(
    "/manclothes/create",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {category, name, image, productInfoDetail, description, price, countInStock} = req.body;
        const productExist = await ManClothes.findOne({name});

        if (productExist) {
            res.status(404);
            throw new Error("Sản phẩm Quần áo Nam này đã tồn tại");
        } else {
            const manclothesProduct = new ManClothes({
                category, 
                name, 
                image, 
                productInfoDetail, 
                description, 
                price, 
                countInStock,
                user: req.user._id,
            })
            if (manclothesProduct) {
                const createdProduct = await manclothesProduct.save();
                res.status(201).json(createdProduct);
            } else {
                res.status(400);
                throw new Error("Dữ liệu sản phẩm không hợp lệ");
            }
            

        }
    })
);

//CREATE TOYS PRODUCT
productRoute.post(
    "/toys/create",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {category, name, image, productInfoDetail, description, price, countInStock} = req.body;
        const productExist = await Toy.findOne({name});

        if (productExist) {
            res.status(404);
            throw new Error("Sản phẩm Đồ chơi này đã tồn tại");
        } else {
            const toyProduct = new Toy({
                category, 
                name, 
                image, 
                productInfoDetail, 
                description, 
                price, 
                countInStock,
                user: req.user._id,
            })
            if (toyProduct) {
                const createdProduct = await toyProduct.save();
                res.status(201).json(createdProduct);
            } else {
                res.status(400);
                throw new Error("Dữ liệu sản phẩm không hợp lệ");
            }
            
        }
    })
);

//CREATE BABYMOM PRODUCT
productRoute.post(
    "/babymom/create",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {category, name, image, productInfoDetail, description, price, countInStock} = req.body;
        const productExist = await BabyMom.findOne({name});

        if (productExist) {
            res.status(404);
            throw new Error("Sản phẩm Mẹ và bé này đã tồn tại");
        } else {
            const babymomProduct = new BabyMom ({
                category, 
                name, 
                image, 
                productInfoDetail, 
                description, 
                price, 
                countInStock,
                user: req.user._id,
            })
            if (babymomProduct) {
                const createdProduct = await babymomProduct.save();
                res.status(201).json(createdProduct);
            } else {
                res.status(400);
                throw new Error("Dữ liệu sản phẩm không hợp lệ");
            }
            
        }
    })
);

//EDIT SHOES PRODUCT
productRoute.put(
    "/shoes/edit/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name, image, productInfoDetail, description, price, countInStock} = req.body;
        
        const shoeProduct = await Shoe.findById(req.params.id);

        if (shoeProduct) {
            shoeProduct.name = name ? name : shoeProduct.name, 
            shoeProduct.price = price ? price : shoeProduct.price,
            shoeProduct.description = description ? description : shoeProduct.description;
            shoeProduct.productInfoDetail = productInfoDetail ? productInfoDetail : shoeProduct.productInfoDetail,
            shoeProduct.image = image ? image : shoeProduct.image;
            shoeProduct.countInStock = countInStock ? countInStock : shoeProduct.countInStock;
            
            const updatedProduct = await shoeProduct.save();
            res.status(201).json(updatedProduct);

        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm Giày dép bạn cần chỉnh sửa")
        }

    })
);

//EDIT MOBILES PRODUCT
productRoute.put(
    "/mobiles/edit/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name, image, productInfoDetail, description, price, countInStock} = req.body;
        
        const mobileProduct = await Mobile.findById(req.params.id);

        if (mobileProduct) {
            mobileProduct.name = name ? name : mobileProduct.name, 
            mobileProduct.price = price ? price : mobileProduct.price,
            mobileProduct.description = description ? description : mobileProduct.description;
            mobileProduct.productInfoDetail = productInfoDetail ? productInfoDetail : mobileProduct.productInfoDetail,
            mobileProduct.image = image ? image : mobileProduct.image;
            mobileProduct.countInStock = countInStock ? countInStock : mobileProduct.countInStock;
             
            const updatedProduct = await mobileProduct.save();
            res.status(201).json(updatedProduct);

        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm Điện thoại bạn cần chỉnh sửa")
        }

    })
);

//EDIT MANCLOTHES PRODUCT
productRoute.put(
    "/manclothes/edit/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name, image, productInfoDetail, description, price, countInStock} = req.body;
        
        const manclothesProduct = await ManClothes.findById(req.params.id);

        if (manclothesProduct) {
            manclothesProduct.name = name ? name : manclothesProduct.name, 
            manclothesProduct.price = price ? price : manclothesProduct.price,
            manclothesProduct.description = description ? description : manclothesProduct.description;
            manclothesProduct.productInfoDetail = productInfoDetail ? productInfoDetail : manclothesProduct.productInfoDetail,
            manclothesProduct.image = image ? image : manclothesProduct.image;
            manclothesProduct.countInStock = countInStock ? countInStock : manclothesProduct.countInStock;
             
            const updatedProduct = await manclothesProduct.save();
            res.status(201).json(updatedProduct);

        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm Quần áo Nam bạn cần chỉnh sửa")
        }

    })
);

//EDIT TOYS PRODUCT
productRoute.put(
    "/toys/edit/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name, image, productInfoDetail, description, price, countInStock} = req.body;
        
        const toyProduct = await Toy.findById(req.params.id);

        if (toyProduct) {
            toyProduct.name = name ? name : toyProduct.name, 
            toyProduct.price = price ? price : toyProduct.price,
            toyProduct.description = description ? description : toyProduct.description;
            toyProduct.productInfoDetail = productInfoDetail ? productInfoDetail : toyProduct.productInfoDetail,
            toyProduct.image = image ? image : toyProduct.image;
            toyProduct.countInStock = countInStock ? countInStock : toyProduct.countInStock;
             
            const updatedProduct = await toyProduct.save();
            res.status(201).json(updatedProduct);

        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm Đồ chơi bạn cần chỉnh sửa")
        }

    })
);

//EDIT BABYMOM PRODUCT
productRoute.put(
    "/babymom/edit/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name, image, productInfoDetail, description, price, countInStock} = req.body;
        
        const babymomProduct = await BabyMom.findById(req.params.id);

        if (babymomProduct) {
            babymomProduct.name = name ? name : babymomProduct.name, 
            babymomProduct.price = price ? price : babymomProduct.price,
            babymomProduct.description = description ? description : babymomProduct.description;
            babymomProduct.productInfoDetail = productInfoDetail ? productInfoDetail : babymomProduct.productInfoDetail,
            babymomProduct.image = image ? image : babymomProduct.image;
            babymomProduct.countInStock = countInStock ? countInStock : babymomProduct.countInStock;
             
            const updatedProduct = await babymomProduct.save();
            res.status(201).json(updatedProduct);

        } else {
            res.status(404);
            throw new Error("Không tìm thấy sản phẩm Mẹ và bé bạn cần chỉnh sửa")
        }

    })
);

//GET CATEGORY BY ID
productRoute.get(
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
productRoute.put(
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
productRoute.post(
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
productRoute.delete(
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
productRoute.get(
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
productRoute.get(
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
productRoute.get(
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
productRoute.post(
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
productRoute.delete(
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

export default productRoute;