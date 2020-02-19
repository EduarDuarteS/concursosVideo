const {DataTypes} = require('sequelize')
const sequelize = require('../settings/sequelize')

const Contest = require('./contest')

const Admin = sequelize.define('Admin', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
    }
})

Admin.hasMany(Contest, {as: 'Contests'})

module.exports = Admin