const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: function (req, res, next) {
        // get the auth header
        const bearerHeader = req.headers['authorization'];
        
        // check if it is not undefined
        if (typeof bearerHeader !== 'undefined') {
            // set the token
            req.token = bearerHeader;
            
            jwt.verify(req.token, 'secretykey', (err, authData) => {
                if (err) {
                    return res.status(401).json({ error: 'Unauthorized' });
                } else {
                    req.authData = authData;
                    console.log('LoginAuth File', req.authData);
                    next();
                }
            });
        } else {
            // forbidden
            return res.status(403).json({ error: 'Forbidden' });
        }
        // Remove the next() call from here
    }
};