import { VOUCHER_ADMIN_GET_ALL_FAIL, VOUCHER_ADMIN_GET_ALL_REQUEST, VOUCHER_ADMIN_GET_ALL_RESET, VOUCHER_ADMIN_GET_ALL_SUCCESS, VOUCHER_SINGLE_CREATE_FAIL, VOUCHER_SINGLE_CREATE_REQUEST, VOUCHER_SINGLE_CREATE_RESET, VOUCHER_SINGLE_CREATE_SUCCESS, VOUCHER_SINGLE_DELETE_FAIL, VOUCHER_SINGLE_DELETE_REQUEST, VOUCHER_SINGLE_DELETE_RESET, VOUCHER_SINGLE_DELETE_SUCCESS, VOUCHER_SINGLE_DETAIL_FAIL, VOUCHER_SINGLE_DETAIL_REQUEST, VOUCHER_SINGLE_DETAIL_SUCCESS, VOUCHER_SINGLE_UPDATE_FAIL, VOUCHER_SINGLE_UPDATE_REQUEST, VOUCHER_SINGLE_UPDATE_RESET, VOUCHER_SINGLE_UPDATE_SUCCESS } from "../Constants/VoucherConstants";


//GET ALL VOUCHER
export const voucherGetAllReducer = (state = { vouchers: [] }, action) => {
  switch (action.type) {
    case VOUCHER_ADMIN_GET_ALL_REQUEST:
      return { loading: true };
    case VOUCHER_ADMIN_GET_ALL_SUCCESS:
      return { loading: false, vouchers: action.payload };
    case VOUCHER_ADMIN_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    case VOUCHER_ADMIN_GET_ALL_RESET:
      return { vouchers: [] };
    default:
      return state;
  }
}

//GET SINGLE VOUCHER
export const voucherGetSingleDetailReducer = (state = { voucher: {} }, action) => {
  switch (action.type) {
    case VOUCHER_SINGLE_DETAIL_REQUEST:
      return { loading: true, ...state }
    case VOUCHER_SINGLE_DETAIL_SUCCESS:
      return { loading: false, voucher: action.payload };
    case VOUCHER_SINGLE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//UPDATE A VOUCHER
export const voucherUpdateReducer = (state = { voucher: {} }, action) => {
  switch (action.type) {
    case VOUCHER_SINGLE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case VOUCHER_SINGLE_UPDATE_SUCCESS:
      return { loading: false, success: true, voucher: action.payload };
    case VOUCHER_SINGLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VOUCHER_SINGLE_UPDATE_RESET:
      return { voucher: {} };
    default:
      return state;
  }
}

//ADMIN ADD VOUCHER
export const addSingleVoucherAdminReducer = (state = { voucherAdded: {} }, action) => {
  switch (action.type) {
    case VOUCHER_SINGLE_CREATE_REQUEST:
      return { loading: true };
    case VOUCHER_SINGLE_CREATE_SUCCESS:
      return { loading: false, success: true, voucherAdded: action.payload };
    case VOUCHER_SINGLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VOUCHER_SINGLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export const deleteSingleVoucherReducer = (state = {}, action) => {
  switch (action.type) {
    case VOUCHER_SINGLE_DELETE_REQUEST:
      return { loading: true };
    case VOUCHER_SINGLE_DELETE_SUCCESS:
      return { loading: false, success: true, voucherDeleted: action.payload };
    case VOUCHER_SINGLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case VOUCHER_SINGLE_DELETE_RESET:
      return {};
    default:
      return state;
  }
}