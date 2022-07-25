const jwt = require('jsonwebtoken');

function generateJwt(data) {
    return jwt.sign(data, process.env.SECRET_TOKEN, {

    })
}

function validateJwt(data) {
    try {
        const AuthUser = jwt.verify(data, process.env.SECRET_TOKEN)

        return AuthUser;
    } catch (error) {
        return false
    }
}

module.exports = {
    generateJwt,
    validateJwt
}
