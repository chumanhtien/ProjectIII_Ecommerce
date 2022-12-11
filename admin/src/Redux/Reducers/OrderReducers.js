import { ORDER_ADMIN_GET_ORDERS_OF_USER_FAIL, ORDER_ADMIN_GET_ORDERS_OF_USER_REQUEST, ORDER_ADMIN_GET_ORDERS_OF_USER_RESET, ORDER_ADMIN_GET_ORDERS_OF_USER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MARK_CONFIRMED_FAIL, ORDER_MARK_CONFIRMED_REQUEST, ORDER_MARK_CONFIRMED_RESET, ORDER_MARK_CONFIRMED_SUCCESS, ORDER_MARK_DELIVERED_FAIL, ORDER_MARK_DELIVERED_REQUEST, ORDER_MARK_DELIVERED_RESET, ORDER_MARK_DELIVERED_SUCCESS } from "../Constants/OrderConstants";

export const orderListReducer = ((state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {loading: true};
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;

    }
});

//ORDER GET SINGLE DETAILS
export const orderSingleDetailsReducer = (
    state = {loading: true, orderItems: [], shippingAddress: {}},
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}  

//ORDER MARK DELIVERED
export const orderMarkDeliveredReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case ORDER_MARK_DELIVERED_REQUEST:
            return {loading: true};
        case ORDER_MARK_DELIVERED_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case ORDER_MARK_DELIVERED_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_MARK_DELIVERED_RESET:
            return {}
        default:
            return state;
    }
}  

//ORDER MARK CONFIRMED
export const orderMarkConfirmedReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case ORDER_MARK_CONFIRMED_REQUEST:
            return {loading: true};
        case ORDER_MARK_CONFIRMED_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case ORDER_MARK_CONFIRMED_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_MARK_CONFIRMED_RESET:
            return {}
        default:
            return state;
    }
}  

//GET USER'S ORDER
export const orderAdminGetUserOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_ADMIN_GET_ORDERS_OF_USER_REQUEST:
            return {loading: true};
        case ORDER_ADMIN_GET_ORDERS_OF_USER_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_ADMIN_GET_ORDERS_OF_USER_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_ADMIN_GET_ORDERS_OF_USER_RESET:
            return {orders: []};
        default:
            return state;
    }
}