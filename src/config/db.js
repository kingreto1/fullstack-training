const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456didan",
    database: "postgres",
    schema: "users",
    dialect: 'postgres',
})

module.exports = {
    sequelize
}