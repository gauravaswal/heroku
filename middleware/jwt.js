var jwt = require('jsonwebtoken');
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader 
    if (token == null) return res.status(401).json({error:"Token is not provided"}) // if there isn't any token
  
    jwt.verify(token, process.env.SECRET_KEY , (err, user) => {
      if (err) return res.status(403).json({error:"Invalid token provided",err:err,success:false})
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
  }