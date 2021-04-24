const express = require('express')
import * as Middleware from '../.././middleware/jwt'
import CategoryController from  './category.controller';
 const categoryRouter = express.Router()
 categoryRouter.post('/add-category',Middleware.authenticateToken,CategoryController.addCategory)
 categoryRouter.get('/get-category',CategoryController.getCategory)


 module.exports = categoryRouter