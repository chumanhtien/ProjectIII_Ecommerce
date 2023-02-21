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
      $options: "i",
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
  const { name, type, description, discount, maxValue, isActive, expireAt, minValueOfOrderRequire } = req.body;
  if (name === undefined
    || type === undefined
    || description === undefined
    || discount === undefined
    || maxValue === undefined
    || isActive === undefined
    || minValueOfOrderRequire === undefined
    || expireAt === undefined
  ) {
    res.status(402);
    throw new Error("Thiếu trường thông tin");
  } else {
    let expireAtDate = Date.now()
    if (expireAt) {
      if (expireAt < Date.now()) {
        res.status(401);
        throw new Error("Bạn chỉ được phép cài đặt hạn với mã giảm giá này với thời gian lớn hơn hiện tại");
      } else {
        expireAtDate = expireAt
      }
    }
    else 
      expireAtDate = new Date(Date.now() + 7 * 1000 * 24 * 3600)
    // console.log(expireAtDate)
    const newVoucher = await Voucher.create({
      name,
      type,
      description,
      discount,
      maxValue,
      isActive,
      minValueOfOrderRequire,
      expireAt: new Date(expireAtDate)
    });
    if (newVoucher) {
      if (newVoucher.isActive === true) {
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
      // const newUsers = await User.find({})
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

export const updateVoucher = asyncHandler(async (req, res) => {
  const { name, type, description, discount, maxValue, minValueOfOrderRequire, isActive, expireAt } = req.body;
  const { id } = req.params;
  if (name === undefined
    || type === undefined
    || description === undefined
    || discount === undefined
    || maxValue === undefined
    || isActive === undefined
    || minValueOfOrderRequire === undefined
    || expireAt === undefined
  ) {
    res.status(402);
    throw new Error("Thiếu trường thông tin");
  } else {
    const voucher = await Voucher.findById(id);
    if (voucher) {
      const preActive = voucher.isActive;
      if (name !== undefined) {
        voucher.name = name;
      } 
      if (type !== undefined) {
        voucher.type = type;
      } 
      if (description !== undefined) {
        voucher.description = description;
      } 
      if (discount !== undefined) {
        voucher.discount = discount;
      } 
      if (maxValue !== undefined) {
        voucher.maxValue = maxValue;
      } 
      if (minValueOfOrderRequire !== undefined) {
        voucher.minValueOfOrderRequire = minValueOfOrderRequire;
      } 
      if (isActive !== undefined) {
        voucher.isActive = isActive;
      } 
      if (expireAt !== undefined) {
        voucher.expireAt = expireAt;
      } 
  
      const updateVOucher = await voucher.save()
      if (preActive === false && preActive !== isActive) {
        const users = await User.find({});
        if (users) {
          await Promise.all(
            users.map((user) => {
              if (user.role === 3) {
                user.listVouchers.push(voucher._id);
                user.save();
              }
            })
          )
        } else {
          throw new Error("Lỗi, không tìm thấy users")
        }
      } else if (preActive === true && preActive !== isActive) {
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
      }
      res.status(201).json(updateVOucher)
    } else {
      res.status(404);
      throw new Error("Không tìm thấy mã giảm giá tương ứng id = ", id);
    }
  }
})

export const activeVoucher = asyncHandler(async (req, res) => {
  const { id } = req.body
  const voucher = Voucher.findById(id);
  if (voucher) {
    if (!voucher.isActive) {
      if (!voucher.expireAt.getTime() < Date.now().getTime()) {
        voucher.isActive = true;
        await voucher.save();
      } else {
        throw new Error("Không thể kích hoạt mã với hạn đã hết")
      }
    } else {
      res.status(401);
      throw new Error("Không thể kích hoạt mã giảm giá đã kích hoạt")
    }
  } else {
    res.status(404);
    throw new Error("Không tìm thấy mã giảm giá với id = ", id);
  }
})

export const getAllVouchersByAdmin = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword.trim(),
      $options: "i",
    }
  } : {};

  // const count = await Voucher.countDocuments({ ...keyword });
  const listVouchers = await Voucher.find({ ...keyword })
    
  if (listVouchers) {
    res.status(200).json(listVouchers)
  } else {
    res.status(404);
    throw new Error("Lỗi. Không tìm được danh sách Voucher");
  }
})

export const getAllVouchersOfUser = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword.trim(),
      $options: "i",
    },
  }
  : {};
  const userID = req.user._id;
  const user = await User.findById(userID);
  if (user) {
    let listVouchersID = []
    if (user.role === 3) {
      if (user.listVouchers) {
        user.listVouchers.map((voucherItem) => {
          listVouchersID.push(voucherItem._id)
        })
        const listVouchers = await Voucher.find({...keyword}).where('_id').in(listVouchersID);
        // listVouchers = listVouchers.find({...keyword})
        res.status(200).json(listVouchers);
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(401);
      throw new Error("Chức năng chỉ dành cho tìm kiếm voucher của tài khoản Khách hàng")
    }
  } else {
    res.status(404);
    throw new Error("Không tìm thấy user để tìm voucher của user với userID = ", userID);
  }
})