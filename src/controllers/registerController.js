const { Yup } = require("../config/yup");
const supabase = require("../config/db");

async function registerController(req, res) {
    try {
        const data = req.body

        let schema = Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório").label("Nome"),
            email: Yup.string().required("Email é obrigatório").label("Email"),
            password: Yup.string().min(4).required("Senha é obrigatória").label("Senha") 
        })
        
        await schema.validate(data)

        const exists = await supabase
            .from('users')
            .select('*')
            .match({ email: data.email }) 
        
        if(exists.data) throw new Error("Este email já foi cadastrado");

        const created = await supabase
            .from('users')
            .insert([
                { name: data.name, email: data.email, password: data.password },
            ])

        let token = generateJwt(created.data)

        res.status(201)
        return res.json({
            token
        });
    } catch (err) {
        res.status(400)
        return res.json({
            message: err.message
        })
    }
}

module.exports = {
    registerController
}