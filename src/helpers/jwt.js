const jwt = require('jsonwebtoken');

function generateJwt(data) {
    return jwt.sign(data, "ASKLJCBYSTRIAASDASHFAHSBGF2361572416089", {

    })
}

function validateJwt(data) {
    try {
        const AuthUser = jwt.verify(data, "ASKLJCBYSTRIAASDASHFAHSBGF2361572416089")

        return AuthUser;
    } catch (error) {
        return false
    }
}

module.exports = {
    generateJwt,
    validateJwt
}
