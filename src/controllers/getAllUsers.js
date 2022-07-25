const { Users } = require("../models/users")

async function getAllUsers(req, res) {
    try {
        let list = await Users.findAll({
            order: [['name', 'DESC']],
            limit: 5,
        })    

        res.status(200)
        return res.json(list)
    } catch (error) {
        res.status(400)
        return res.json({
            message: error.message
        })
    }

}

module.exports = {
    getAllUsers
}