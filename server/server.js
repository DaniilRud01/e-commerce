const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { readdirSync } = require('fs')
require('dotenv').config()

//server
const server = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('db is connected'))
.catch(err => console.log('DB connection err', err))


//middlewares
//В консоле показывает какие запросы были отправлены на сервер
server.use(morgan("dev"))
//передает на сервер данные в req.body
server.use(bodyParser.json({limit: "50mb"}))
//Позволяет обрабатываеть данные с разных источников(Портов)
server.use(cors())

readdirSync('./routes').map((r) => server.use('/api', require('./routes/' + r)))

//PORT

const port = process.env.PORT || 8080

server.listen(port, () => console.log(`server is started port: ${port}`))