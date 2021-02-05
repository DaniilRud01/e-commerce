const express = require('express')

const server = express()

//middlewares
const { authCheck, adminCheck }  = require('../middlewares/auth')
//контроллеры
const { create, allList, remove, read, update, list, totalProducts, productRating, listRelated, searchFilters }  = require('../controllers/product')

server.post('/product', authCheck, adminCheck, create)
server.get('/products/total', totalProducts)


server.get('/products/:count', allList)
server.delete('/product/:slug',authCheck, adminCheck, remove)
server.get('/product/:slug', read)
server.put('/product/:slug', update)
server.post('/products', list)
server.put('/product/star/:productId', authCheck, productRating)
server.get('/product/related/:productId', listRelated)

//Поиск
server.post('/search/filters', searchFilters)

module.exports = server
