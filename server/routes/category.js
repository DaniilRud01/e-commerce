const express = require('express')

const server = express()

//middlewares
const { authCheck, adminCheck }  = require('../middlewares/auth')
//контроллеры
const { create, read, update, remove, list,getSubs }  = require('../controllers/category')

server.post('/category', authCheck, adminCheck, create)
server.get('/categories', list)
server.get('/category/:slug', read)
server.put('/category/:slug', authCheck, adminCheck, update)
server.delete('/category/:slug', authCheck, adminCheck, remove)
server.get('/category/subs/:_id',getSubs)


module.exports = server
