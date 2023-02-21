import axios from "axios";
import { VOUCHER_ADMIN_GET_ALL_FAIL, VOUCHER_ADMIN_GET_ALL_REQUEST, VOUCHER_ADMIN_GET_ALL_SUCCESS, VOUCHER_SINGLE_CREATE_FAIL, VOUCHER_SINGLE_CREATE_REQUEST, VOUCHER_SINGLE_CREATE_RESET, VOUCHER_SINGLE_CREATE_SUCCESS, VOUCHER_SINGLE_DELETE_FAIL, VOUCHER_SINGLE_DELETE_REQUEST, VOUCHER_SINGLE_DELETE_SUCCESS, VOUCHER_SINGLE_DETAIL_FAIL, VOUCHER_SINGLE_DETAIL_REQUEST, VOUCHER_SINGLE_DETAIL_SUCCESS, VOUCHER_SINGLE_UPDATE_FAIL, VOUCHER_SINGLE_UPDATE_REQUEST, VOUCHER_SINGLE_UPDATE_SUCCESS } from "../Constants/VoucherConstants"
import { URL } from "../URL";
import { logout } from "./UserActions";


export const getAllVouchers = (keyword = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_ADMIN_GET_ALL_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    const { data } = await axios.get(`${URL}/api/vouchers/admin/all?keyword=${keyword}`, config);
    dispatch({ type: VOUCHER_ADMIN_GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: VOUCHER_ADMIN_GET_ALL_FAIL,
      payload: message
    });
  }
}

//GET VOUCHER DETAIL BY ADMIN
export const getSingleVoucherByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_SINGLE_DETAIL_REQUEST });
    const { data } = await axios.get(`${URL}/api/vouchers/${id}`);
    dispatch({ type: VOUCHER_SINGLE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: VOUCHER_SINGLE_DETAIL_FAIL,
      payload: message,
    })
  }
}

//ADD VOUCHER BY ADMIN
export const addVoucherByAdmin = ({
  type, name, description, discount, minValue, maxValue, expireAt, isActive
}) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_SINGLE_CREATE_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
  
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    };
    const { data } = await axios.post(
      `${URL}/api/vouchers/create`,
      {
        type,
        name,
        description,
        discount,
        maxValue,
        minValueOfOrderRequire: minValue,
        isActive,
        expireAt
      },
      config
    );
    dispatch({ type: VOUCHER_SINGLE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
        type: VOUCHER_SINGLE_CREATE_FAIL,
        payload: message,
    })
  }
}

//DELETE A VOUCHER
export const deleteAVoucherByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_SINGLE_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    const { data } = await axios.delete(
      `${URL}/api/vouchers/${id}/delete`,
      config,
    );
    dispatch({ type: VOUCHER_SINGLE_DELETE_SUCCESS, payload: data });

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    if (message === "Not authorized, token failed") {
        dispatch(logout());
    }
    dispatch({
      type: VOUCHER_SINGLE_DELETE_FAIL,
      payload: message,
    })
  }
}

//UPDATE A VOUCHER
export const udpateAVoucher = (voucher, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VOUCHER_SINGLE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      },
    };
    const { data } = await axios.put(
      `${URL}/api/vouchers/edit/${id}`,
      voucher,
      config
    );
    dispatch({ type: VOUCHER_SINGLE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: VOUCHER_SINGLE_UPDATE_FAIL,
      payload: message,
    })
  }
}
