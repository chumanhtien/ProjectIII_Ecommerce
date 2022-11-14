import { BABYMOM_LIST_FAIL, BABYMOM_LIST_REQUEST, BABYMOM_LIST_SUCCESS, MANCLOTHES_LIST_FAIL, MANCLOTHES_LIST_REQUEST, MANCLOTHES_LIST_SUCCESS, MOBILES_LIST_FAIL, MOBILES_LIST_REQUEST, MOBILES_LIST_SUCCESS, NEWS_LIST_FAIL, NEWS_LIST_REQUEST, NEWS_LIST_SUCCESS, NEW_SINGLE_DETAIL_FAIL, NEW_SINGLE_DETAIL_REQUEST, NEW_SINGLE_DETAIL_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_GET_ALL_FAIL, PRODUCT_GET_ALL_REQUEST, PRODUCT_GET_ALL_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SINGLE_DETAIL_FAIL, PRODUCT_SINGLE_DETAIL_REQUEST, PRODUCT_SINGLE_DETAIL_SUCCESS, SHOES_LIST_FAIL, SHOES_LIST_REQUEST, SHOES_LIST_SUCCESS, TOYS_LIST_FAIL, TOYS_LIST_REQUEST, TOYS_LIST_SUCCESS } from "../Constants/ProductConstants";

export const shoesListReducer = (state = {shoesProducts: []}, action) => {
    switch (action.type) {
        case SHOES_LIST_REQUEST:
            return {loading: true, shoesProducts: []};
        case SHOES_LIST_SUCCESS:
            return {
                loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                shoesProducts: action.payload.shoesProducts 
            };
        case SHOES_LIST_FAIL:
            return {loading: false, error: action.payload};
            default: 
            return state;
    }
}
export const mobilesListReducer = (state = {mobilesProducts: []}, action) => {
    switch (action.type) {
        case MOBILES_LIST_REQUEST:
            return {loading: true, mobilesProducts: []};
        case MOBILES_LIST_SUCCESS:
            return {
                loading: false, 
                mobilesProducts: action.payload.mobilesProducts,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case MOBILES_LIST_FAIL:
            return {loading: false, error: action.payload};    
        default: 
            return state;
    }
}

export const manClothesListReducer = (state = {manClothesProducts: []}, action) => {
    switch (action.type) {
        case MANCLOTHES_LIST_REQUEST:
            return {loading: true, manClothesProducts: []};
        case MANCLOTHES_LIST_SUCCESS:
            return {
                loading: false, 
                manClothesProducts: action.payload.manClothesProducts,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case MANCLOTHES_LIST_FAIL:
            return {loading: false, error: action.payload};    
        default: 
            return state;
    }
}

export const toysListReducer = (state = {toysProducts: []}, action) => {
    switch (action.type) {
        case TOYS_LIST_REQUEST:
            return {loading: true, toysProducts: []};
        case TOYS_LIST_SUCCESS:
            return {
                loading: false, 
                toysProducts: action.payload.toysProducts,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case TOYS_LIST_FAIL:
            return {loading: false, error: action.payload};    
        default: 
            return state;
    }
}

//GET BABYMOM LIST PRODUCTS
export const babymomListReducer = (state = {babymomProducts: []}, action) => {
    switch (action.type) {
        case BABYMOM_LIST_REQUEST:
            return {loading: true, toysProducts: []};
        case BABYMOM_LIST_SUCCESS:
            return {
                loading: false, 
                babymomProducts: action.payload.babymomProducts,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case BABYMOM_LIST_FAIL:
            return {loading: false, error: action.payload};    
        default: 
            return state;
    }
}

// export const productListReducer = (state = {products: []}, action) => {
//     switch (action.type) {
//         case PRODUCT_LIST_REQUEST:
//             return {loading: true, products: []};
//         case PRODUCT_LIST_SUCCESS:
//             return {loading: false, products: action.payload};
//         case PRODUCT_LIST_FAIL:
//             return {loading: false, error: action.payload};    
//         default: 
//             return state;
//     }
// }; 

//GET ALL PRODUCT
export const productGetAllReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_GET_ALL_REQUEST:
            return {loading: true, products: []};
        case PRODUCT_GET_ALL_SUCCESS:
            return {
                loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products,
                
            };
        case PRODUCT_GET_ALL_FAIL:
            return {loading: false, error: action.payload};    
        default: 
            return state;
    }
}; 

//SINGLE PRODUCT DETAILS
export const singleProductDetailReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_SINGLE_DETAIL_REQUEST:
            return {...state, loading: true};
        case PRODUCT_SINGLE_DETAIL_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_SINGLE_DETAIL_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state; 
    }
}

//PRODUCT CREATE REVIEW
export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true};
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success: true};
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
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

//GET ALL NEWS
export const newsListReducer = (state = {news: []}, action) => {
    switch (action.type) {
        case NEWS_LIST_REQUEST:
            return {loading: true};
        case NEWS_LIST_SUCCESS:
            return {loading: false, news: action.payload};
        case NEWS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

//SINGLE NEW (NOI BO)
export const singleNewDetailReducer = (state = {newInfo: {}}, action) => {
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