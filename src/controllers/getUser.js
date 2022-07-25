const { Users } = require("../models/users")

async function getUser(req, res) {
    try {
        const { id } = req.params;
        let user = await Users.findOne({
            where: { id }
        })    

        if (!user) throw new Error("Usuário não encontrado")

        res.status(200)
        return res.json(user)
    } catch (error) {
        res.status(400)
        return res.json({
            message: error.message
        })
    }

}

module.exports = {
    getUser
}