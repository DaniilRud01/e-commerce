const express = require('express')

const server = express()

//middlewares
const { authCheck, adminCheck }  = require('../middlewares/auth')
//контроллеры
const { createOrUpdateUser, currentUser }  = require('../controllers/auth')

server.post('/create-or-update-user', authCheck, createOrUpdateUser)
server.post('/current-user', authCheck, currentUser)
server.post('/current-admin', authCheck, adminCheck, currentUser)


module.exports = server
