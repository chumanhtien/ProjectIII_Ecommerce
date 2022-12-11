import { NEW_SINGLE_DETAIL_FAIL, NEW_SINGLE_DETAIL_REQUEST, NEW_SINGLE_DETAIL_SUCCESS, PRODUCT_ADMIN_ADD_CATEGORY_FAIL, PRODUCT_ADMIN_ADD_CATEGORY_REQUEST, PRODUCT_ADMIN_ADD_CATEGORY_RESET, PRODUCT_ADMIN_ADD_CATEGORY_SUCCESS, PRODUCT_ADMIN_ADD_NEWS_FAIL, PRODUCT_ADMIN_ADD_NEWS_REQUEST, PRODUCT_ADMIN_ADD_NEWS_RESET, PRODUCT_ADMIN_ADD_NEWS_SUCCESS, PRODUCT_ADMIN_DELETE_CATEGORY_FAIL, PRODUCT_ADMIN_DELETE_CATEGORY_REQUEST, PRODUCT_ADMIN_DELETE_CATEGORY_RESET, PRODUCT_ADMIN_DELETE_CATEGORY_SUCCESS, PRODUCT_ADMIN_DELETE_NEWS_FAIL, PRODUCT_ADMIN_DELETE_NEWS_REQUEST, PRODUCT_ADMIN_DELETE_NEWS_RESET, PRODUCT_ADMIN_DELETE_NEWS_SUCCESS, PRODUCT_ADMIN_EDIT_CATEGORY_FAIL, PRODUCT_ADMIN_EDIT_CATEGORY_REQUEST, PRODUCT_ADMIN_EDIT_CATEGORY_RESET, PRODUCT_ADMIN_EDIT_CATEGORY_SUCCESS, PRODUCT_ADMIN_GET_ALL_NEWS_FAIL, PRODUCT_ADMIN_GET_ALL_NEWS_REQUEST, PRODUCT_ADMIN_GET_ALL_NEWS_SUCCESS, PRODUCT_ADMIN_GET_CATEGORY_FAIL, PRODUCT_ADMIN_GET_CATEGORY_REQUEST, PRODUCT_ADMIN_GET_CATEGORY_RESET, PRODUCT_ADMIN_GET_CATEGORY_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_GETALL_ADMIN_FAIL, PRODUCT_GETALL_ADMIN_REQUEST, PRODUCT_GETALL_ADMIN_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../Constants/ProductConstants";

//GET ALL PRODUCTS
export const productGetAllReducer = (state = {allProducts: {}}, action) => {
    switch (action.type) {
        case PRODUCT_GETALL_ADMIN_REQUEST:
            return {loading: true, allProducts: {}};
        case PRODUCT_GETALL_ADMIN_SUCCESS:
            return {loading: false, allProducts: action.payload};
        case PRODUCT_GETALL_ADMIN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

//GET ALL CATEGORIES
export const productListCategoriesReducer = (state = {categories: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_CATEGORY_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_CATEGORY_SUCCESS:
            return {loading: false, categories: action.payload};
        case PRODUCT_LIST_CATEGORY_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

//DELETE PRODUCT
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true, productDeleted: action.payload}
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_DELETE_RESET:
            return {}
        default:
            return state;
    }
}

//PRODUCT CREATE
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload};
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_CREATE_RESET:
            return {};
        default: 
            return state;
    }
}

//PRODUCT SINGLE DETAILS REDUCER
export const productSingleDetailsReducer = (
    state = {product: {reviews: []}}, 
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}

//PRODUCT EDIT
export const productEditReducer = (
    state = {product: {reviews: []}}, 
    action
) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return { ...state, loading: true}
        case PRODUCT_EDIT_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}

//UPDATE PRODUCT
export const productUpdateReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true};
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true, product: action.payload};
        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_UPDATE_RESET:
            return {product: {}};
        default:
            return state;
    }
}


//CATEGORY GET DETAIL BY ADMIN
export const categoryInfoDetailsReducer = (state = {category: {}}, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_GET_CATEGORY_REQUEST:
            return {...state, loading: true}
        case PRODUCT_ADMIN_GET_CATEGORY_SUCCESS:
            return {loading: false, category: action.payload}
        case PRODUCT_ADMIN_GET_CATEGORY_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_ADMIN_GET_CATEGORY_RESET:
            return {category: {}};
        default:
            return state;
    }
}

//CATEGORY EDIT PROFILE BY ADMIN
export const categoryEditByAdminReducer = (state = {category: {}}, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_EDIT_CATEGORY_REQUEST:
            return {loading: true};
        case PRODUCT_ADMIN_EDIT_CATEGORY_SUCCESS:
            return {loading: false, success: true, category: action.payload};
        case PRODUCT_ADMIN_EDIT_CATEGORY_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_ADMIN_EDIT_CATEGORY_RESET:
            return {category: {}}
        default:
            return state;
    }
}

//CATEGORY ADD BY ADMIN
export const categoryAddByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_ADD_CATEGORY_REQUEST:
            return { loading: true}
        case PRODUCT_ADMIN_ADD_CATEGORY_SUCCESS:
            return {loading: false, success: true, category: action.payload};
        case PRODUCT_ADMIN_ADD_CATEGORY_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_ADMIN_ADD_CATEGORY_RESET:
            return {};
        default: 
            return state;
    }
}

//CATEGORY DELETE BY ADMIN
export const categoryDeleteByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_DELETE_CATEGORY_REQUEST:
            return {loading: true};
        case PRODUCT_ADMIN_DELETE_CATEGORY_SUCCESS:
            return {loading: false, success: true, categoryDeleted: action.payload};
        case PRODUCT_ADMIN_DELETE_CATEGORY_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_ADMIN_DELETE_CATEGORY_RESET:
            return {};
        default:
            return state;
    }
}

//GET ALL NEWS
export const productListNewsReducer = (state = {news: []}, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_GET_ALL_NEWS_REQUEST:
            return {loading: true};
        case PRODUCT_ADMIN_GET_ALL_NEWS_SUCCESS:
            return {loading: false, news: action.payload};
        case PRODUCT_ADMIN_GET_ALL_NEWS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

//ADMIN ADD A NEWS
export const singleNewsAddByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_ADD_NEWS_REQUEST:
            return { loading: true}
        case PRODUCT_ADMIN_ADD_NEWS_SUCCESS:
            return {loading: false, success: true, newsAdded: action.payload};
        case PRODUCT_ADMIN_ADD_NEWS_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_ADMIN_ADD_NEWS_RESET:
            return {};
        default: 
            return state;
    }
}

//ADMIN DELETE A NEWS
export const newsDeleteByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_DELETE_NEWS_REQUEST:
            return {loading: true};
        case PRODUCT_ADMIN_DELETE_NEWS_SUCCESS:
            return {loading: false, success: true, newsDeleted: action.payload};
        case PRODUCT_ADMIN_DELETE_NEWS_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_ADMIN_DELETE_NEWS_RESET:
            return {};
        default:
            return state;
    }
}

//SINGLE NEW (NOI BO)
export const singleNewsDetailReducer = (state = {newInfo: {}}, action) => {
    switch (action.type) {
        case NEW_SINGLE_DETAIL_REQUEST:
            return {...state, loading: true};
        case NEW_SINGLE_DETAIL_SUCCESS:
            return {loading: false, newInfo: action.payload};
        case NEW_SINGLE_DETAIL_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state; 
    }
}