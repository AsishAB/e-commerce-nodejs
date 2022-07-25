const jwt = require('jsonwebtoken');
const secretJsonWebTokenKey = require('../helpers/secret-files-gitallow/jsonwebtoken-secret');

module.exports = (req, res, next) => {
    const authorisationToken = req.get('Authorization');
    
    if (!authorisationToken) {
        console.log("Inside AuthMiddleware -> No authorisationToken Found! User is not authorized");
        req.isAuth = false;
        return next();
    }
    const token = authorisationToken.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secretJsonWebTokenKey);
    } catch(err) {
        console.log(err);
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        console.log("Inside AuthMiddleware -> No decodedToken Found! User is not authorized");
        req.isAuth = false;
        return next();
        // const error = new Error("No Token Found! User is not authorized");
        // error.statusCode = 401;
        // throw error;
    }
    
    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
}