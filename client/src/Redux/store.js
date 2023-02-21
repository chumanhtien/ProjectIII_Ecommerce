import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension";
import { babymomListReducer, manClothesListReducer, mobilesListReducer, newsListReducer, productCreateReviewReducer, productGetAllReducer, productListCategoriesReducer, shoesListReducer, singleNewDetailReducer, singleProductDetailReducer, toysListReducer } from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { userInfoReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/UserReducers";
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListOfUserReducer, orderPayReducer } from "./Reducers/OrderReducers";
import { voucherListReducer } from "./Reducers/VoucherReducers";

const reducer = combineReducers({
    shoesList: shoesListReducer,
    mobilesList: mobilesListReducer,
    manClothesList: manClothesListReducer,
    toysList: toysListReducer,
    babymomList: babymomListReducer,
    newsList: newsListReducer,
    
    singleProductDetails: singleProductDetailReducer,
    singleNewDetails: singleNewDetailReducer,
    // productsList: productListReducer,
    productCreateReview: productCreateReviewReducer,
    productGetAll: productGetAllReducer,
    productListCategories: productListCategoriesReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userInfoDetail: userInfoReducer,
    userUpdateProfile: userUpdateProfileReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListOfUser: orderListOfUserReducer,
    orderDelete: orderDeleteReducer,

    voucherList: voucherListReducer

});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems")) : [];

//LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo")) 
: null;

// ShippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress")) 
: null;

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage,
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;