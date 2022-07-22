const jwt = require('jsonwebtoken');
const secretJsonWebTokenKey = require('../helpers/secret-files-gitallow/jsonwebtoken-secret');

module.exports = (req, res, next) => {
    const authorisationToken = req.get('Authorization');
    if (!authorisationToken) {
        const error = new Error("No Token Found! User is not authorized");
        error.statusCode = 401;
        throw error;
    }
    const token = authorisationToken.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secretJsonWebTokenKey);
    } catch(err) {
        err.statusCode = 500;
        next(err);
    }

    if (!decodedToken) {
        const error = new Error("No Token Found! User is not authorized");
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}