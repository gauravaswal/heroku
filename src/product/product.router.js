const express = require('express')
import * as Middleware from '../.././middleware/jwt'
import ProductController from  './product.controller';
 const productRouter = express.Router()
 var multer  = require('multer')
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
 productRouter.post('/add-product',Middleware.authenticateToken,upload.single('photo'),ProductController.addProduct)
 productRouter.get('/get-product',ProductController.getProduct)
 productRouter.post("/by/search", ProductController.listBySearch);
 productRouter.get('/get-product/:productId',ProductController.getProductById)

 module.exports = productRouter