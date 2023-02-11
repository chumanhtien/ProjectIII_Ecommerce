import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDB.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/OrderRoutes.js";
import cartRouter from "./Routes/CartRoutes.js";
import productRoute from "./Routes/ProductRoutes.js";
import voucherRouter from "./Routes/VoucherRoutes.js";

import shoesProducts from "./data/Products/shoesProducts.js";
import mobilesProducts from "./data/Products/mobilesProducts.js";
import babymomProducts from "./data/Products/babymom.js";
import manclothesProducts from "./data/Products/manclothesProducts.js";
import toysProducts from "./data/Products/toys.js"
import {errorHandler, notFound} from "./Middleware/Errors.js"
import cors from "cors";
import ClearData from "./ClearData.js";
import ImportData from "./DataImport.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

//Test 
app.get("/", (req, res) => {
    res.send("Hello, API is Running");
});

//API Test
// app.get("/api/products/shoes", (req, res) => {
//     res.json(shoesProducts);
// }) ;

// app.get("/api/products/shoes/:id", (req, res) => {
//     const product = shoesProducts.find((p) => p._id == req.params.id);
//     res.json(product);
// }) ;

// app.get("/api/products/dtdd", (req, res) => {
//     res.json(dtddProducts);
// }) ;

// app.get("/api/products/dtdd/:id", (req, res) => {
//     const product = dtddProducts.find((p) => p._id == req.params.id);
//     res.json(product);
// }) ;

// app.get("/api/products/manclothes", (req, res) => {
//     res.json(manclothesProducts);
// }) ;

// app.get("/api/products/manclothes/:id", (req, res) => {
//     const product = manclothesProducts.find((p) => p._id == req.params.id);
//     res.json(product);
// }) ;

// app.get("/api/products/toys", (req, res) => {
//     res.json(toysProducts);
// }) ;

// app.get("/api/products/toys/:id", (req, res) => {
//     const product = toysProducts.find((p) => p._id == req.params.id);
//     res.json(product);
// }) ;

// app.get("/api/products/babymom", (req, res) => {
//     res.json(babymomProducts);
// }) ;

// app.get("/api/products/babymom/:id", (req, res) => {
//     const product = babymomProducts.find((p) => p._id == req.params.id);
//     res.json(product);
// }) ;

//API Import
app.use("/api/import", ImportData);

//DATA from MONGDODB
app.use("/api/products", productRoute);

// API User
app.use("/api/users", userRouter);

//API Orders
app.use("/api/orders", orderRouter);

//API Cart
app.use("/api/cart", cartRouter);

//API Voucher
app.use("/api/vouchers", voucherRouter);

//PAYPAL SANDBOXS
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

//API CLEAR
app.use("/api/clear", ClearData);

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

  

app.listen(PORT, console.log(`server is running in port ${PORT}`))