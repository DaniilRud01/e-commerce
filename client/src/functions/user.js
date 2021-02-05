import axios from 'axios'

export const userCart = async (cart, authToken) => {
  return  await axios.post(`${process.env.REACT_APP_API}/user/cart`, { cart }, {
        headers:{
            authToken
        }
    })
}

export const getUserCart = async (authToken) => {
    return  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers:{
            authToken
        }
    })
}

export const emptyCartUser = async (authToken) => {
      await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers:{
            authToken
        }
    })
}

export const saveAddress = async (address,authToken) => {
   return await axios.post(`${process.env.REACT_APP_API}/user/address`, {address},{
        headers:{
            authToken
        }
    })
}

export const appleCoupon = async (coupon,authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart/coupon`, {coupon},{
        headers:{
            authToken
        }
    })
}

export const createOrder = async (stripeResponse,authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },{
        headers:{
            authToken
        }
    })
}

export const getUserOrders = async (authToken) => {
    return  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers:{
            authToken
        }
    })
}

export const getWishList = async (authToken) => {
    return  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
        headers:{
            authToken
        }
    })
}

export const removeWishlist = async (productId,authToken) => {
    return  await axios.put(`${process.env.REACT_APP_API}/user/wishlist/${productId}`, {},{
        headers:{
            authToken
        }
    })
}

export const addToWishList = async (productId,authToken) => {
    return  await axios.post(`${process.env.REACT_APP_API}/user/wishlist`, { productId },{
        headers:{
            authToken
        }
    })
}
