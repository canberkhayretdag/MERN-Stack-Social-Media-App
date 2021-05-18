const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies['picrafia-token']
    if (token == null) return res.sendStatus(401) // if there isn't any token
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        req.token = token
        next()
    })

}