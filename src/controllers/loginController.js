const { Yup } = require("../config/yup");
const { generateJwt } = require("../helpers/jwt");
const supabase = require("../config/db");

async function loginController(req, res) {
    try {
        const data = req.body

        let schema = Yup.object().shape({
            email: Yup.string().required("Email é obrigatório").label("Email"),
            password: Yup.string().min(4).required("Senha é obrigatória").label("Senha") 
        })
        await schema.validate(data)
        
        const user = await supabase
            .from('users')
            .select('*')
            .match({
                email: data.email,
                password: data.password
            });
            
        if(user.data.length == 0) throw new Error("Login ou senha inválido.");
        
        let token = generateJwt(data)
        console.log(user.data);

        res.status(200)
        return res.json({
            token
        });
    } catch (err) {
        res.status(400)
        return console.log('erro: '+err.message);
    }
}

module.exports = {
    loginController
}