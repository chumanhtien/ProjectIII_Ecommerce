import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { adminUpdateProfileReducer, userAddByAdminReducer, userBlockedReducer, userDeleteByAdminReducer, userEditInfoByAdminReducer, userInfoDetailsReducer, userListReducer, userLoginReducer, userUnBlockedReducer } from "./Reducers/UserReducers";
import { categoryAddByAdminReducer, categoryDeleteByAdminReducer, categoryEditByAdminReducer, categoryInfoDetailsReducer, newsDeleteByAdminReducer, productCreateReducer, productDeleteReducer, productEditReducer, productGetAllReducer, productListCategoriesReducer, productListNewsReducer, productSingleDetailsReducer, productUpdateReducer, singleNewsAddByAdminReducer, singleNewsDetailReducer } from "./Reducers/ProductReducers";
import { orderAdminGetUserOrdersReducer, orderListReducer, orderMarkConfirmedReducer, orderMarkDeliveredReducer, orderSingleDetailsReducer } from "./Reducers/OrderReducers";
import { addSingleVoucherAdminReducer, deleteSingleVoucherReducer, voucherGetAllReducer, voucherGetSingleDetailReducer, voucherUpdateReducer } from "./Reducers/VoucherReducers";


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    userBlocked: userBlockedReducer,
    userUnBlocked: userUnBlockedReducer,
    userInfoDetails: userInfoDetailsReducer,
    userEditInfo: userEditInfoByAdminReducer,
    userAddInfo: userAddByAdminReducer,
    userDeleteInfo: userDeleteByAdminReducer,
    adminUpdateProfile: adminUpdateProfileReducer,

    productGetAll: productGetAllReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productSingleDetails: productSingleDetailsReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,

    newsListByAdmin: productListNewsReducer,
    singleNewsDetail: singleNewsDetailReducer,
    singleNewsAddByAdmin: singleNewsAddByAdminReducer,
    newsDeleteByAdmin: newsDeleteByAdminReducer,


    categoryInfoDetails: categoryInfoDetailsReducer,
    categoryEdit: categoryEditByAdminReducer,
    categoryAdd: categoryAddByAdminReducer,
    categoryDelete: categoryDeleteByAdminReducer,
    


    categoryList: productListCategoriesReducer,
    
    orderList: orderListReducer,
    orderSingleDetails: orderSingleDetailsReducer,
    orderMarkDelivered: orderMarkDeliveredReducer,
    orderMarkConfirmed: orderMarkConfirmedReducer,
    orderAdminGetUserOrders: orderAdminGetUserOrdersReducer,

    //voucher
    voucherList: voucherGetAllReducer,
    voucherSingleDetail: voucherGetSingleDetailReducer,
    voucherSingleAdd: addSingleVoucherAdminReducer,
    voucherSingleDelete: deleteSingleVoucherReducer,
    voucherSingleUpdate: voucherUpdateReducer
}); 



//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

const initialState = {
    userLogin: {userInfo: userInfoFromLocalStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;