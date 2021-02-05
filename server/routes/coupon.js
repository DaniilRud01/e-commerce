const express = require('express')

const server = express()

//middlewares
const { authCheck, adminCheck }  = require('../middlewares/auth')
//контроллеры
const { create, remove, list }  = require('../controllers/coupon')

server.post('/coupon', authCheck, adminCheck, create)
server.get('/coupons', list)
server.delete('/coupon/:couponId', authCheck, adminCheck, remove)


module.exports = server
