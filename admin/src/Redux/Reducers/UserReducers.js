import { 
    ADMIN_DETAILS_FAIL,
    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_RESET,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_UPDATE_PROFILE_FAIL,
    ADMIN_UPDATE_PROFILE_REQUEST,
    ADMIN_UPDATE_PROFILE_SUCCESS,
    USER_ADMIN_ADD_USER_FAIL,
    USER_ADMIN_ADD_USER_REQUEST,
    USER_ADMIN_ADD_USER_RESET,
    USER_ADMIN_ADD_USER_SUCCESS,
    USER_ADMIN_DELETE_USER_FAIL,
    USER_ADMIN_DELETE_USER_REQUEST,
    USER_ADMIN_DELETE_USER_RESET,
    USER_ADMIN_DELETE_USER_SUCCESS,
    USER_ADMIN_EDIT_USER_FAIL,
    USER_ADMIN_EDIT_USER_REQUEST,
    USER_ADMIN_EDIT_USER_SUCCESS,
    USER_ADMIN_GET_USER_FAIL,
    USER_ADMIN_GET_USER_REQUEST,
    USER_ADMIN_GET_USER_RESET,
    USER_ADMIN_GET_USER_SUCCESS,
    USER_BLOCKED_FAIL,
    USER_BLOCKED_REQUEST,
    USER_BLOCKED_RESET,
    USER_BLOCKED_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,  
    USER_LOGOUT,
    USER_UNBLOCKED_FAIL,
    USER_UNBLOCKED_REQUEST,
    USER_UNBLOCKED_RESET,
    USER_UNBLOCKED_SUCCESS, 
} from "../Constants/UserConstants";

//LOGIN
export const userLoginReducer = (state = {}, action) => {
switch (action.type) {
    case USER_LOGIN_REQUEST:
        return {loading: true};
    case USER_LOGIN_SUCCESS:
        return {loading: false, userInfo: action.payload};
    case USER_LOGIN_FAIL:
        return {loading: false, error: action.payload};
    case USER_LOGOUT:
        return {};
    default:
        return state;
}
}

//GET ALL USERS
export const userListReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {loading: true};
        case USER_LIST_SUCCESS:
            return {loading: false, users: action.payload};
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload};
        case USER_LIST_RESET:
            return {users: []}
        default:
            return state;
    }
}

//USER BLOCK
export const userBlockedReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case USER_BLOCKED_REQUEST:
            return {loading: true};
        case USER_BLOCKED_SUCCESS:
            return {loading: false, success: true, user: action.payload};
        case USER_BLOCKED_FAIL:
            return {loading: false, error: action.payload};
        case USER_BLOCKED_RESET:
            return {}
        default:
            return state;
    }
}  

//USER UNBLOCK
export const userUnBlockedReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case USER_UNBLOCKED_REQUEST:
            return {loading: true};
        case USER_UNBLOCKED_SUCCESS:
            return {loading: false, success: true, user: action.payload};
        case USER_UNBLOCKED_FAIL:
            return {loading: false, error: action.payload};
        case USER_UNBLOCKED_RESET:
            return {}
        default:
            return state;
    }
}  

//GET USER DETAIL BY ID
export const userInfoDetailsReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_ADMIN_GET_USER_REQUEST:
            return {...state, loading: true}
        case USER_ADMIN_GET_USER_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_ADMIN_GET_USER_FAIL:
            return {loading: false, error: action.payload}
        case USER_ADMIN_GET_USER_RESET:
            return {user: {}};
        default:
            return state;
    }
}

//USER EDIT PROFILE BY ADMIN
export const userEditInfoByAdminReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_ADMIN_EDIT_USER_REQUEST:
            return {loading: true};
        case USER_ADMIN_EDIT_USER_SUCCESS:
            return {loading: false, success: true, user: action.payload};
        case USER_ADMIN_EDIT_USER_FAIL:
            return {loading: false, error: action.payload};
        case USER_ADMIN_GET_USER_RESET:
            return {user: {}}
        default:
            return state;
    }
}

//USER ADD BY ADMIN
export const userAddByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADMIN_ADD_USER_REQUEST:
            return { loading: true}
        case USER_ADMIN_ADD_USER_SUCCESS:
            return {loading: false, success: true, user: action.payload};
        case USER_ADMIN_ADD_USER_FAIL:
            return {loading: false, error: action.payload};
        case USER_ADMIN_ADD_USER_RESET:
            return {};
        default: 
            return state;
    }
}

//USER DELETE BY ADMIN
export const userDeleteByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADMIN_DELETE_USER_REQUEST:
            return {loading: true}
        case USER_ADMIN_DELETE_USER_SUCCESS:
            return {loading: false, success: true, userDeleted: action.payload}
        case USER_ADMIN_DELETE_USER_FAIL:
            return {loading: false, error: action.payload}
        case USER_ADMIN_DELETE_USER_RESET:
            return {}
        default:
            return state;
    }
}


// //ADMIN 
// export const adminDetailsReducer = (state = {}, action) => {
//     switch (action.type) {
//         case ADMIN_DETAILS_REQUEST:
//             return {...state, loading: true};
//         case ADMIN_DETAILS_SUCCESS:
//             return {loading: false, userInfo: action.payload};
//         case ADMIN_DETAILS_FAIL:
//             return {loading: false, error: action.payload};
//         case ADMIN_DETAILS_RESET:
//             return {user: {}};
//         default:
//             return state;
//     }
// }

//ADMIN UPDATE PROFILE
export const adminUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_PROFILE_REQUEST:
            return {loading: true};
        case ADMIN_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload};
        case ADMIN_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

