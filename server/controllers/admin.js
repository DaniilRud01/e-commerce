const User = require('../models/user')
const Order = require('../models/order')



exports.orders = async (req,res) => {
    let allOrders = await Order.find({})
        .sort('-createdAt')
        .populate('products.product')
        .exec()
    res.json(allOrders)
}

exports.orderStatus = async (req,res) => {
    const { orderId, orderStatus } = req.body
     let update = await Order.findByIdAndUpdate(orderId,
         { orderStatus },
         { new: true }
         ).exec()

    res.json(update)
}
