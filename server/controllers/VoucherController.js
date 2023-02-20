import asyncHandler from "express-async-handler";
import Cart from "../Models/CartModel.js";
import User from "../Models/UserModel.js";
import moment from "moment"
import Voucher from "../Models/VoucherModel.js";


//PAGE SIZE
const PAGE_SIZE = 6;

export const getAllVouchers = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword.trim(),
      $option: "i",
    }
  } : {};

  const count = await Voucher.countDocuments({ ...keyword });
  const listVouchers = await Voucher.find({ ...keyword })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * (page - 1))
    .sort({ _id: -1 });
  
  if (listVouchers) {
    res.status(200).json({
      listVouchers,
      page,
      pages: Math.ceil(1.0 * count / PAGE_SIZE)
    })
  } else {
    res.status(404);
    throw new Error("Lỗi. Không tìm được danh sách Voucher");
  }
})

export const getVoucherById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const voucher = await Voucher.findById(id);
  if (voucher) {
    res.status(200).json(voucher)
  } else {
    res.status(404);
    throw new Error(`Loi! Khong tim thay Voucher voi id = ${id}`);
  }
})

export const createVoucher = asyncHandler(async (req, res) => {
  const { name, type, description, discount, maxValue, isActive, expireAt } = req.body;
  let expireAtDate = Date.now()
  if (expireAt)
    expireAtDate = new Date(Date(expireAt).valueOf() + 30 * 1000 * 24 * 3600);
  else 
    expireAtDate = new Date(Date.now() + 30 * 1000 * 24 * 3600)
  console.log(expireAtDate)
  const newVoucher = await Voucher.create({
    name,
    type,
    description,
    discount,
    maxValue,
    isActive,
    expireAt: new Date(expireAtDate)
  });
  if (newVoucher) {
    if (newVoucher.isActive) {
      const users = await User.find({});
      if (users) {
        await Promise.all(
          users.map((user) => {
            if (user.role === 3) {
              user.listVouchers.push(newVoucher._id);
              user.save();
            }
          })
        )
      }
    }
    res.status(201).json({
      _id: newVoucher._id,
      name: newVoucher.name,
      type: newVoucher.type,
      description: newVoucher.description,
      discount: newVoucher.discount,
      maxValue: newVoucher.maxValue,
      isActive: newVoucher.isActive,
      expireAt: new Date(newVoucher.expireAt)
    });
  } else {
    res.status(400);
    throw new Error("Error to add a new voucher");
  }
})

export const deleteVoucher = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const voucher = await Voucher.findById(id);
  if (voucher) {
    if (voucher.isActive) {
      const users = await User.find({});
      if (users) {
        // res.status(200).json(users)

        await Promise.all(
          users.map((user) => {
            if (user.role === 3) {
              user.listVouchers = user.listVouchers.filter((voucherItem) => JSON.stringify(voucherItem._id) !== JSON.stringify(id))
              // const newListVoucher = []
              // if (user.listVouchers?.length != 0) {
              //   user.listVouchers?.forEach(voucherItem => {
              //     if (JSON.stringify(voucherItem._id) !== JSON.stringify(id)) {
              //       newListVoucher.push(voucherItem)
              //     }
              //   });
              //   user.listVouchers = newListVoucher
              // }
              
              user.save();
              // console.log(user.listVouchers)
            }
          })
        )
      }
      const newUsers = await User.find({})
      // res.status(201).json(newUsers)
    }
    const deletedVoucher = voucher;
    await voucher.remove();
    res.status(200).json({
      message: `Xóa thành công voucher có id = ${id}`,
      deletedVoucher
    })
  } else {
    res.status(404);
    throw new Error("Lỗi! Không tìm thấy voucher tương ứng")
  }
})