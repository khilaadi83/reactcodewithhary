module.exports = {
    verifyToken: function (req, res, next) {
        
        // get the auth header file
        const bearerHeader = req.headers['authorization']
        // check if it is not undefined
        if (typeof bearerHeader !== 'undefined') {
            
            // set the token
            req.token = bearerHeader
            
            next();
        } else {
            // forbidden
            res.json({
                MSG: 'Unauthorized'
            })
        }
        next();
    }
}

