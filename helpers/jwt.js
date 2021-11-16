const jwt = require('jsonwebtoken')

function signToken(tokenPayLoad){
    return jwt.sign(tokenPayLoad, 'onepiece');
}

function verifyToken(access_token){
    return jwt.verify(access_token, 'onepiece')
}

module.exports = {
    signToken,verifyToken
}