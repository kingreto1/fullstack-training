const { Users } = require("../models/users")

async function deleteUser(req, res) {
    try {
        const { id } = req.params;   

        let user = await Users.findOne({ where: { id }})

        if (!user) throw new Error("Usuário inválido")

        let isDelete = await Users.destroy({ where: { id }})

        if (!isDelete) throw new Error("Falha ao deletar usuário")


        res.status(200)
        return res.json({
            message: "Usuário deletado com sucesso"
        })
    } catch (error) {
        res.status(400)
        return res.json({
            message: error.message
        })
    }

}

module.exports = {
    deleteUser
}