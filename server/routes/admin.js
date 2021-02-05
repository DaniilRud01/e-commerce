const express = require('express')

const server = express()

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

const { orders, orderStatus } = require('../controllers/admin')

server.get('/admin/orders', authCheck, adminCheck, orders)
server.put('/admin/order-status', authCheck, adminCheck, orderStatus)

module.exports = server

