const express = require('express')
import * as Middleware from '../.././middleware/jwt'
import ReviewController from  './review.controller';
 const reviewRouter = express.Router()
   
  reviewRouter.post('/add-review',Middleware.authenticateToken,ReviewController.addReview)

 module.exports = reviewRouter