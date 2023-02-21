import axios from "axios";
import { VOUCHER_GET_ALL_OF_USER_FAIL, VOUCHER_GET_ALL_OF_USER_REQUEST, VOUCHER_GET_ALL_OF_USER_SUCCESS } from "../Constants/VoucherConstants";
import { URL } from "../URL";
import { logout } from "./UserActions";

export const getListVouchersOfUser = (keyword = "") => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    };
    dispatch({ type: VOUCHER_GET_ALL_OF_USER_REQUEST });
    const { data } = await axios.get(
      `${URL}/api/vouchers/user/all?keyword=${keyword}`,
      config
    );
    dispatch({ type: VOUCHER_GET_ALL_OF_USER_SUCCESS, payload: data });
  } catch (error) {
    const message = 
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    if (message === "Not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: VOUCHER_GET_ALL_OF_USER_FAIL,
      payload: message,
    })
  }
}