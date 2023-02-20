import express from "express";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import * as VoucherController from "../controllers/VoucherController.js";

const voucherRouter = express.Router();

//GET ALL VOUCHERS
voucherRouter.get(
  "/",
  // admin,
  VoucherController.getAllVouchers
);

//GET A SINGLE VOUCHER 
voucherRouter.get(
  "/:id",
  // admin,
  VoucherController.getVoucherById
);

//CREATE A NEW VOUHCER
voucherRouter.post(
  "/create",
  protect,
  admin,
  VoucherController.createVoucher
);

//DELETE A NEW VOUCHER
voucherRouter.delete(
  "/:id/delete",
  protect,
  admin,
  VoucherController.deleteVoucher
);

export default voucherRouter