const { validateJwt } = require("../helpers/jwt");


function verifyAuth(req, res, next) {
    try {
        const { authorization } = req.headers;
        if(!authorization) throw new Error("Invalid authorization header")
        let tokenType = authorization.split(' ')[0];
        let token = authorization.split(' ')[1];
        if (tokenType !== 'Bearer') throw new Error("Invalid Token Type")

        const data = validateJwt(token)

        if(!data) throw new Error("Invalid token")

        req.authUser = data;

        next();
    } catch (error) {
        res.status(401)
        return res.json({
            message: error.message
        })
    }
}

module.exports = {
    verifyAuth
}