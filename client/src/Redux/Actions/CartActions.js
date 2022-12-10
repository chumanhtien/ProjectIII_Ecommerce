import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_FROM_DB, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../Constants/CartConstants";
import { URL } from "../URL";

export const addToCart = (category, id, qty, types={color: "", size: ""}) => async (dispatch, getState) => {
    const {data} = await axios.get(`${URL}/api/products/${category}/${id}`);
    // console.log(data);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            category: category,
            productId: data._id,
            image: data.image,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            qty,
            types,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

//REMOVE FROM CART
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
       type: CART_REMOVE_ITEM,
       payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
       type: CART_SAVE_SHIPPING_ADDRESS,
       payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
}

//SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
       type: CART_SAVE_PAYMENT_METHOD,
       payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
}

//SAVE CART FROM DB
export const saveCartStateFromDB = (userID) => async (dispatch, getState) => {
    const { userLogin: { userInfo }
    } = getState();
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${userInfo.token}`,
        },
    }; 

    const { data } = await axios.get(
        `${URL}/api/cart`,
        config
    )

    dispatch({
        type: CART_SAVE_FROM_DB,
        payload: data
    })

    localStorage.setItem("cartItems", JSON.stringify(data))
}