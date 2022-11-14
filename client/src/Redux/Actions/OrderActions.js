import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_GET_ALL_USER_ORDER_FAIL, ORDER_GET_ALL_USER_ORDER_REQUEST, ORDER_GET_ALL_USER_ORDER_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../Constants/OrderConstants"
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../Constants/CartConstants";
import { logout } from "./UserActions";
import { URL } from "../URL";


//CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 
        const {data} = await axios.post(`${URL}/api/orders/createorder`, order, config);
        dispatch( {type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch( {type: CART_CLEAR_ITEMS, payload: data});

        localStorage.removeItem("cartItems");

    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

//ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`${URL}/api/orders/${id}`, config);
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if (message  === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message
        })
        
    }
}

//ORDER PAY
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 
        const {data} = await axios.put(
            `${URL}/api/orders/${id}/pay`,
            paymentResult, 
            config
        );
        dispatch( {type: ORDER_PAY_SUCCESS, payload: data});

    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

//ORDER DELETE
export const deleteAnOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DELETE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.delete(`${URL}/api/orders/${id}`, config);
        dispatch({type: ORDER_DELETE_SUCCESS, payload: data});
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if (message  === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload: message
        })
        
    }
}

//ORDER GET ALL ORDERS OF USER
export const getAllUserOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_GET_ALL_USER_ORDER_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 
        const {data} = await axios.get(
            `${URL}/api/orders/`,
            config
        );
        dispatch( {type: ORDER_GET_ALL_USER_ORDER_SUCCESS, payload: data});

    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_GET_ALL_USER_ORDER_FAIL,
            payload: message,
        })
    }
}