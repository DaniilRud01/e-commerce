const express = require('express')
const server = express.Router()

const { createPayment } = require('../controllers/stripe')

const { authCheck } = require('../middlewares/auth')

server.post('/create-payment', authCheck, createPayment)

module.exports = server

