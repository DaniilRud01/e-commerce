const express = require('express')

const server = express.Router()

//middleware
const { authCheck, adminCheck } = require('../middlewares/auth')

//controllers

const { upload, remove } = require('../controllers/cloudinary')

//routes

server.post('/uploadimages', authCheck, adminCheck, upload)
server.post('/removeimage', authCheck, adminCheck, remove)

module.exports = server