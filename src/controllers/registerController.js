const { Yup } = require("../config/yup");
const { Users } = require("../models/users")

async function registerController(req, res) {
    try {
        const data = req.body

        let schema = Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório").label("Nome"),
            email: Yup.string().required("Email é obrigatório").label("Email"),
            password: Yup.string().min(4).required("Senha é obrigatória").label("Senha") 
        })
        
        await schema.validate(data)

        let exists = await Users.findOne({ where: { email: data.email }})
        
        if(exists) throw new Error("Este email já foi cadastrado");

        let created = await Users.create(data, { returning: true })

        res.status(201)
        return res.json(created);
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