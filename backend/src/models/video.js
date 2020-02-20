const {DataTypes} = require('sequelize')
const sequelize = require('../settings/sequelize')

const Video = sequelize.define('Video', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoname: {
	    type: DataTypes.STRING,
 	    allowNull: true
    },
    isConverted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    originalPath: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    convertedPath: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    //Use createdAt field
})

module.exports = Video
