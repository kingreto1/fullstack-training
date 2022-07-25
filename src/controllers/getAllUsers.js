const supabase = require("../config/db")

async function getAllUsers(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        let { data: users, error } = await supabase.from('users').select('id, name, email');

        console.log(error);

        res.status(200)
        return res.json(users)
    } catch (err) {
        res.status(400)
        return res.json({
            message: err.message
        })
    }

}

module.exports = {
    getAllUsers
}