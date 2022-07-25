const { Yup } = require("../config/yup");
const { Users } = require("../models/users")

async function updateUser(req, res) {
    try {
        let data = req.body;

        const { id } = req.params;   

        let user = await Users.findOne({ where: { id }})

        if (!user) throw new Error("Usuário inválido.")

        let exists = await Users.findOne({ where: { email: data.email }})

        if (exists) throw new Error("Email já cadastrado.")

        data = {
            name: data.name ? data.name : user.name,
            email: data.email ? data.email : user.email,
            password: data.password ? data.password : user.password,
        }

        let schema = Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório.").label("Nome"),
            email: Yup.string().required("Email é obrigatório.").label("Email"),
            password: Yup.string().min(4).required("Senha é obrigatória.").label("Senha") 
        })
        
        await schema.validate(data)

        let changedUser = await Users.upsert({
            id,
            ...data
        })

        if (!changedUser) throw new Error("Falha ao atualizar o usuário.")
        console.log(changedUser);

        res.status(200)
        return res.json({
            message: "Usuário atualizado com sucesso."
        })
    } catch (error) {
        res.status(400)
        return res.json({
            message: error.message
        })
    }

}

module.exports = {
    updateUser
}