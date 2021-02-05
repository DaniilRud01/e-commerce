const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Coupon = require('../models/coupon')
const Order = require('../models/order')

exports.userCart = async (req,res) => {
    const { cart } = req.body

    let products = []

    const user = await User.findOne({ email: req.user.email }).exec()
    console.log('USER ----->', user)
    let cartByUser = await Cart.findOne({orderBy: user._id}).exec()

    if(cartByUser){
        cartByUser.remove()
    }

    for (let i = 0; i < cart.length; i++){
        let object = {}
        object.product = cart[i]._id
        object.count = cart[i].count
        object.color = cart[i].color

        let productFromDb = await Product.findById(cart[i]._id).select('price').exec()
        object.price = productFromDb.price

        products.push(object)
    }

    let cartTotal = 0

    for(let i = 0; i < products.length; i++){
        cartTotal = cartTotal + products[i].price * products[i].count
    }

    let newCart = await Cart({
        products,
        cartTotal,
        orderBy: user._id
    }).save()
    console.log("newCart ---->", newCart)
    res.json({ ok: true })
}


exports.getUserCart = async (req,res) => {
    const user = await User.findOne({ email: req.user.email })
    let cart = await Cart.findOne({ orderBy: user._id })
        .populate('products.product', '_id title price totalAfterDiscount').exec()

    const { products, cartTotal, totalAfterDiscount } = cart

    res.json({
        products, cartTotal, totalAfterDiscount
    })
}

exports.emptyCart = async (req,res) => {
    const user = await User.findOne({email: req.user.email}).exec()
    let cart = await Cart.findOneAndRemove({ orderBy: user._id })
    console.log('cart', cart)
    res.json(cart)
}

exports.saveAddress = async (req,res) => {
    const userAddress = await User.findOneAndUpdate(
        {email: req.user.email},
        {address: req.body.address}
        )
        .exec()
    res.json({ok: true})
}

exports.applyCoupon = async (req,res) =>  {
    const { coupon } = req.body
    const validCoupon = await Coupon.findOne({name: coupon}).exec()

    if(validCoupon === null){
        return res.json({
            err: 'Invalid coupon'
        })
    }

    const user = await User.findOne({email: req.user.email}).exec()

    let { products, cartTotal } = await Cart.findOne({orderBy: user._id})
        .populate('products.product', '_id title price')
        .exec()

    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2)


    Cart.findOneAndUpdate({orderBy: user._id}, {totalAfterDiscount}, {new: true}).exec()

    res.json(totalAfterDiscount)
}

exports.createOrder = async (req,res) => {
    const { paymentIntent } = req.body.stripeResponse
    const user = await User.findOne({ email: req.user.email }).exec()

    let { products } = await Cart.findOne({ orderBy: user._id }).exec()

    console.log('product', products)

    let newOrder = await new Order({
        products,
        paymentIntent,
        orderBy: user._id
    }).save()

    //уменьшение остатка товаров на складе

    let quantityOptions = products.map((el) => {
        return {
            updateOne: {
                filter: { _id: el.product._id },
                update: { $inc: { quantity: -el.count, sold: +el.count } }
            }
        }
    })

  let updated = await Product.bulkWrite(quantityOptions, {})

    res.json({ ok: true })

}

exports.orders = async (req,res) => {
    const user = await User.findOne({ email: req.user.email }).exec()

    const userOrders = await Order.find({orderBy: user._id })
        .populate('products.product').exec()

    res.json(userOrders)
}

exports.addToWishList = async (req,res) => {
    const { productId } = req.body
    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $addToSet: { wishlist: productId } },
        { new: true }
        ).exec()
    res.json({ ok: true })
}

exports.WishList = async (req,res) => {
    const list = await User.findOne({ email: req.user.email })
        .select('wishlist')
        .populate('wishlist')
        .exec()
    res.json(list)
}

exports.removeWishList = async (req,res) => {
    const { productId } = req.body
    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $pull: { wishlist: productId } },
        { new: true }
        ).exec()
    res.json({ ok: true })
}