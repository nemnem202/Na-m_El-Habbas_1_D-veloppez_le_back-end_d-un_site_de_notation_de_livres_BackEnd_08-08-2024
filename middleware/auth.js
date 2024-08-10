const WebToken = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = WebToken.verify(token, 'Random_Token')
        const userId = decodedToken.userId
        req.auth = {
            userId: userId
        }
        next()
    } catch(error) {
        console.log('token non vérifié')
        res.status(401).json({error}) 
    } 
}