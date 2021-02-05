const express = require('express')

const server = express()

//middlewares
const { authCheck } = require('../middlewares/auth')

//controllers

const { userCart, getUserCart, emptyCart, saveAddress, applyCoupon, createOrder, orders, addToWishList, WishList, removeWishList } = require('../controllers/user')

server.post('/user/cart', authCheck, userCart)
server.get('/user/cart', authCheck, getUserCart)
server.delete('/user/cart', authCheck, emptyCart)
server.post('/user/address', authCheck, saveAddress)

//купоны

server.post('/user/cart/coupon', authCheck, applyCoupon)
// server.get('/user', (req,res) => {
//     res.json({
//         data: 'server is started user component'
//     })
// })

//заказ

server.post('/user/order', authCheck, createOrder)
server.get('/user/orders', authCheck, orders)


// избранное

server.post('/user/wishlist', authCheck, addToWishList)
server.get('/user/wishlist', authCheck, WishList)
server.put('/user/wishlist/:productId', authCheck, removeWishList)

module.exports = server
