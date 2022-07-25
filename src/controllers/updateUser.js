const { Yup } = require("../config/yup");
const supabase = require("../config/db");

async function updateUser(req, res) {
    try {
        let data = req.body;

        const { id } = req.params;   

        const user = await supabase
            .from('users')
            .select('*')
            .match({ id })  

        if (!user) throw new Error("Usuário inválido.")

        const exists = await supabase
            .from('users')
            .select('*')
            .match({ email: data.email }) 

        if (exists.data) throw new Error("Email já cadastrado.")

        data = {
            name: data.name ? data.name : user.data.name,
            email: data.email ? data.email : user.data.email,
            password: data.password ? data.password : user.data.password,
        }

        let schema = Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório.").label("Nome"),
            email: Yup.string().required("Email é obrigatório.").label("Email"),
            password: Yup.string().min(4).required("Senha é obrigatória.").label("Senha") 
        })
        
        await schema.validate(data)

        let changedUser = await supabase
            .from('users')
            .update(data)
            .match({ id })

        if (!changedUser.data) throw new Error("Falha ao atualizar o usuário.")

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