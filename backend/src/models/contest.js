const {DataTypes} = require('sequelize')
const sequelize = require('../settings/sequelize')

const Video = require('./video')

const Contest = sequelize.define('Contest', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Contest.hasMany(Video, {as: 'Videos', onDelete: 'CASCADE',})

module.exports = Contest