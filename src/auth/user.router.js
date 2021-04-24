const express = require('express')
import * as Middleware from '../.././middleware/jwt'
import AuthController from  './user.controller';
 const userRouter = express.Router()
 userRouter.post('/signup',AuthController.signup)
 userRouter.post('/signin',AuthController.signin)
 userRouter.get('/signout',Middleware.authenticateToken,AuthController.signout)


 

 module.exports = userRouter