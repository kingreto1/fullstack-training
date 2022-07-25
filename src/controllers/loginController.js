const { Yup } = require("../config/yup");
const { generateJwt } = require("../helpers/jwt");
const { Users } = require("../models/users")

async function loginController(req, res) {
    try {
        const data = req.body

        let schema = Yup.object().shape({
            email: Yup.string().required("Email é obrigatório").label("Email"),
            password: Yup.string().min(4).required("Senha é obrigatória").label("Senha") 
        })
        
        await schema.validate(data)
        
        let user = await Users.findOne({ where: { email: data.email, password: data.password }})
        
        if(!user) throw new Error("Login ou senha inválido.");

        let token = generateJwt(user.get({ plain: true }))

        res.status(200)
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
    loginController
}