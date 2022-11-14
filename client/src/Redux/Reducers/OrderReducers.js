import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_RESET, ORDER_DELETE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_GET_ALL_USER_ORDER_FAIL, ORDER_GET_ALL_USER_ORDER_REQUEST, ORDER_GET_ALL_USER_ORDER_RESET, ORDER_GET_ALL_USER_ORDER_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../Constants/OrderConstants"


//CREATE ORDER
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload};
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload};
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

//GET SINGLE ORDER DETAILS
export const orderDetailsReducer = (state = {loading: true, orderItems: [], shippingAddress: {}}, action) => {
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

//ORDER PAY
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {loading: true};
        case ORDER_PAY_SUCCESS:
            return {loading: false, success: true};
        case ORDER_PAY_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
}

//ORDER GET LIST ORDERS OF USERS
export const orderListOfUserReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_GET_ALL_USER_ORDER_REQUEST:
            return {loading: true};
        case ORDER_GET_ALL_USER_ORDER_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_GET_ALL_USER_ORDER_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_GET_ALL_USER_ORDER_RESET:
            return {orders: []};
        default:
            return state;
    }
}

//ORDER DELETE
export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DELETE_SUCCESS:
            return {loading: false, success: true, orderDeleted: action.payload};
        case ORDER_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_DELETE_RESET:
            return {};
        default:
            return state;
    }
}