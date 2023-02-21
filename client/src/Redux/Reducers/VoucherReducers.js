import { VOUCHER_GET_ALL_OF_USER_FAIL, VOUCHER_GET_ALL_OF_USER_REQUEST, VOUCHER_GET_ALL_OF_USER_RESET, VOUCHER_GET_ALL_OF_USER_SUCCESS } from "../Constants/VoucherConstants";

export const voucherListReducer = (state = { vouchers: [] }, action) => {
  switch (action.type) {
    case VOUCHER_GET_ALL_OF_USER_REQUEST:
      return { loading: true, vouchers: [] };
    case VOUCHER_GET_ALL_OF_USER_SUCCESS:
      return { loading: false, success: true, vouchers: action.payload };
    case VOUCHER_GET_ALL_OF_USER_FAIL:
      return { loading: false, error: action.payload };
    case VOUCHER_GET_ALL_OF_USER_RESET:
      return {}
    default:
      return state;
  }
}