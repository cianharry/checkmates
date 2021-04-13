const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // extract token from the request header
    const token = req.header('x-auth-token');
    // check if no token is present
    if(!token) {
        return res.status(401).json({ msg: 'No token present, authorization unsuccessful' });
    }
    // verify token
    // Req_Id: R02
    // Test_Id: T006
    try {
        const extracted = jwt.verify(token, config.get('jwtSecret'));
        req.user = extracted.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is invlaid' });
    }
}