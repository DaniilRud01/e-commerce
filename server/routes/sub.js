const express = require('express')

const server = express()

//middlewares
const { authCheck, adminCheck }  = require('../middlewares/auth')
//контроллеры
const { create, read, update, remove, list }  = require('../controllers/sub')

server.post('/sub', authCheck, adminCheck, create)
server.get('/subs', list)
server.get('/sub/:slug', read)
server.put('/sub/:slug', authCheck, adminCheck, update)
server.delete('/sub/:slug', authCheck, adminCheck, remove)


module.exports = server
