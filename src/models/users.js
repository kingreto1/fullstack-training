const pkg = require("sequelize");
const { Model, DataTypes } = pkg;
const { sequelize } = require("../config/db");

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: sequelize,
    tableName: 'users',
    underscored: true,
    timestamps: true
})

module.exports = { Users };