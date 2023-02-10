import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import BabyMom from "../Models/ProductModels/BabyMomModel.js";
import ManClothes from "../Models/ProductModels/ManClothesModel.js";
import Mobile from "../Models/ProductModels/MobileModel.js";
import Shoe from "../Models/ProductModels/ShoeModel.js";
import Toy from "../Models/ProductModels/ToyModel.js";


export const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems, 
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    } else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createOrder = await order.save();
        let product = {};
        let updatedProduct = {};
        for (let i = 0; i < orderItems.length; i++) {
            product = await ((await Mobile.findById(orderItems[i].productId)) || (await Shoe.findById(orderItems[i].productId))
                    || (await ManClothes.findById(orderItems[i].productId)) || (await BabyMom.findById(orderItems[i].productId))
                    || (await Toy.findById(orderItems[i].productId)));
            console.log("product: ", product.productId);
            if (product) {
                console.log(`CountInStock of ${updatedProduct.name} is: ${updatedProduct.countInStock}`)
                product.countInStock -= orderItems[i].qty;
                updatedProduct = await product.save();
                if (updatedProduct)
                    console.log(`New CountInStock of ${updatedProduct.name} after updated is: ${updatedProduct.countInStock}`);
            }
        }
    
        res.status(201).json(createOrder);
    }

})

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
})

export const deleteOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (order) {
        // res.json(order);
        if (!order.isConfirmed) {
            const deletedOrder = order;
            let product = {};
            let updatedProduct = {};
            for (let i = 0; i < order.orderItems.length; i++) {
                product = await ((await Mobile.findById(order.orderItems[i].productId)) || (await Shoes.findById(order.orderItems[i].productId))
                        || (await ManClothes.findById(order.orderItems[i].productId)) || (await BabyMom.findById(order.orderItems[i].productId))
                        || (await Toy.findById(order.orderItems[i].productId)));
                if (product) {
                    console.log("product: ", product._id);
                    console.log(`CountInStock of ${product.name} is: ${product.countInStock}`)
                    product.countInStock += order.orderItems[i].qty;
                    updatedProduct = await product.save();
                    if (updatedProduct)
                        console.log(`New CountInStock of ${updatedProduct.name} after updated is: ${updatedProduct.countInStock}`);
                }
            }
            await order.remove();
            res.json({
                message: `Xóa thành công Đơn hàng có mã ${deletedOrder._id}`,
                deletedOrder});
        } else {
            throw new Error("Không thể Hủy vì Đơn hàng đã được Xác nhận và Đang giao");
        }
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
})

export const payOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true,
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
    
})

export const getAllOrdersOfUserLogin = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id}).sort({_id: -1});
    if (orders) {
        res.json(orders);
    }
    else {
        res.status(404);
        throw new Error("Lỗi! Không thấy đơn đặt hàng của bạn")
    }
})

//ADMIN

export const getAllOrdersByAdmin = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .sort({ _id: -1 })
        .populate("user", "_id email name");
    if (orders) {
        res.json(orders);
    } else {
        res.status(404);
        throw new Error("Lỗi! Không thấy đơn đặt hàng của bạn")
    }
})

export const markAsDeliveredOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order && order.isConfirmed) {
        order.isDelivered = true,
        order.isPaid = true,
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } 
    else if (!order.isConfirmed){
        res.status(403);
        throw new Error("Đơn đặt hàng này phải được Xác nhận trước khi giao!");
    }
    else {
        res.status(404);
        throw new Error("Không tìm thấy Đơn đặt hàng");
    }
})

export const markAsConfirmedOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isConfirmed = true,
        order.isConfirmedAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } 
    else {
        res.status(404);
        throw new Error("Không tìm thấy Đơn đặt hàng");
    }
})

export const getAllOrdersOfAnUser = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.params.id})
        .sort({_id: -1})
        .populate("user", "_id email name");;
    
    if (orders) {
        res.json(orders);

    } else {
        res.status(404);
        throw new Error("Lỗi! Không lấy được các đơn hàng của Khách hàng")
    }
})