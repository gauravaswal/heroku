const express = require('express')
const userRouter = require('./auth/user.router')
const apiRouter = express.Router()
const categoryRouter = require('./category/category.router')
const productRouter = require('./product/product.router')

apiRouter.use('/users', userRouter)
apiRouter.use('/category', categoryRouter)
apiRouter.use('/product', productRouter)

module.exports = apiRouter