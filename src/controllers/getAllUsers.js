async function getAllUsers(req, res) {
    try {
        let { data: users, error } = await supabase.from('users').select('*');

        console.log({
            error,
            users
        });

        res.status(200)
        return res.json(users)
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