const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const { secretToken } = require('../settings/jwt');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        let decoded
        try {
            decoded = jwt.verify(token, secretToken)
            console.log(decoded)
        }catch {
            return res.status(400).send({ error: 'Token has expired, please login again' })
        }

        const admin = await Admin.findOne({
            where: {
                id: decoded.id,
                token
            }
        })

        if(admin) {
            req.token = token
            req.admin = admin
            next()
        }else {
            throw new Error()
        }
    } catch (e) {
        return res.status(401).send({ error: 'Unable to identify, please login again' })
    }
}

module.exports = auth
