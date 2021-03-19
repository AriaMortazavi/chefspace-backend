const jwt = require('jsonwebtoken')

const seceretToken = process.env.ACCESS_TOKEN_SECRET || '0635edc4111760efd96b1a559ed39fabc583fb2d612afc070ed5ea1142e1656c6694dc58341f82e7c9efddae510544ab738938ac59a01fadc46b90033b6336c8'

function createToken(data){
    const accesssToken = jwt.sign(data, seceretToken, {expiresIn: "1h"})
     return token
}

exports.createToken = createToken


  function authenticateToken (req, res, next){
    const authHeader = req.headers.authorization
    const token = authHeader ? authHeader.split(' ')[1] : null
        if (!token){
            return res.sendStatus(401)
        } 
        let decode

        try{
            decode = jwt.verify(token, seceretToken);
        } catch (error){
            return res.sendStatus(403)
        }

    req.user = decode
    next()
}

exports.authenticateToken = authenticateToken
   