import axios from "axios";
import { ORDER_ADMIN_GET_ORDERS_OF_USER_FAIL, ORDER_ADMIN_GET_ORDERS_OF_USER_REQUEST, ORDER_ADMIN_GET_ORDERS_OF_USER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MARK_CONFIRMED_FAIL, ORDER_MARK_CONFIRMED_REQUEST, ORDER_MARK_CONFIRMED_SUCCESS, ORDER_MARK_DELIVERED_FAIL, ORDER_MARK_DELIVERED_REQUEST, ORDER_MARK_DELIVERED_SUCCESS } from "../Constants/OrderConstants"
import { URL } from "../URL";
import { logout } from "./UserActions";

//GET ALLL ORDERS OF ALL USERS
export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const {data} = await axios.get(`${URL}/api/orders/admin/all`, config);
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        })
    }
}

//GET SINGLE ORDER DETAILS
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

//ORDER MARK DELIVERED
export const markDeliveredOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_MARK_DELIVERED_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(
            `${URL}/api/orders/${id}/delivered`, 
            {}, 
            config
        );
        dispatch({type: ORDER_MARK_DELIVERED_SUCCESS, payload: data});
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if (message  === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_MARK_DELIVERED_FAIL,
            payload: message
        })
        
    }
}

//ORDER MARK DELIVERED
export const markConfirmedOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_MARK_CONFIRMED_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(
            `${URL}/api/orders/${id}/confirmed`, 
            {}, 
            config
        );
        dispatch({type: ORDER_MARK_CONFIRMED_SUCCESS, payload: data});
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if (message  === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_MARK_CONFIRMED_FAIL,
            payload: message
        })
        
    }
}

//GET USER'S ORDERS
export const getAllUserOrdersByAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_ADMIN_GET_ORDERS_OF_USER_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 
        const {data} = await axios.get(
            `${URL}/api/orders/user/${id}`,
            config
        );
        dispatch( {type: ORDER_ADMIN_GET_ORDERS_OF_USER_SUCCESS, payload: data});

    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_ADMIN_GET_ORDERS_OF_USER_FAIL,
            payload: message,
        })
    }
}