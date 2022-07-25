const supabase = require("../config/db");

async function deleteUser(req, res) {
    try {
        const { id } = req.params;   

        const user = await supabase
            .from('users')
            .select('*')
            .match({ id });

        if (!user.data) throw new Error("Usuário inválido")

        const isDeleted = await supabase
            .from('users')
            .select('*')
            .match({ id });

        if (!isDeleted.data) throw new Error("Falha ao deletar usuário")

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