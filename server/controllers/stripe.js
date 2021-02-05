const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/coupon')
const stripe = require('stripe')(process.env.STRIPE_SECRET)


exports.createPayment = async(req, res) => {

    //поиск пользователя
    const { couponApplied } = req.body
    const user = await User.findOne({ email: req.user.email })

    //получить корзину пользователя

    const { cartTotal , totalAfterDiscount} = await Cart.findOne({ orderBy: user._id }).exec()
    // оплатить

    let finalAmount = 0

    if(couponApplied && totalAfterDiscount){
        finalAmount = Math.round(totalAfterDiscount * 100)
    }else{
        finalAmount = Math.round(cartTotal * 100)
    }


    const paymentIntents = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: 'usd',
    })
    res.send({
        clientSecret: paymentIntents.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable: finalAmount
    })
}

