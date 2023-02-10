import express from "express";
import {admin, protect} from "../Middleware/AuthMiddleware.js";
import * as OrderController from "../controllers/OrderController.js";

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
    "/createorder",
    protect,
    OrderController.createOrder
);

//GET ORDER BY ID
orderRouter.get(
    "/:id",
    protect,
    OrderController.getOrderById
);

//DELETE ORDER BY ID
orderRouter.delete(
    "/:id",
    protect,
    OrderController.deleteOrderById
);


//ORDER PAYMENT
orderRouter.put(
    "/:id/pay",
    protect,
    OrderController.payOrder
)

//USER LOGIN ORDERS
orderRouter.get(
    "/",
    protect,
    OrderController.getAllOrdersOfUserLogin
)

//ADMIN GETALL ORDERS
orderRouter.get(
    "/admin/all",
    protect,
    admin,
    OrderController.getAllOrdersByAdmin
)

//MARK DELIVERED AN ORDER
orderRouter.put(
    `/:id/delivered`,
    protect,
    admin,
    OrderController.markAsDeliveredOrder
)

//MARK CONFIRMED AN ORDER
orderRouter.put(
    `/:id/confirmed`,
    protect,
    admin,
    OrderController.markAsConfirmedOrder
)


//ADMIN GET USER ORDERS
orderRouter.get(
    "/user/:id",
    protect,
    admin,
    OrderController.getAllOrdersOfAnUser
)

export default orderRouter;