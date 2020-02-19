const express = require('express')
const router = new express.Router()

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { secretToken } = require('../settings/jwt')
const Admin = require('../models/admin')

const auth = require('../auth/auth')

router.post('/create', async (req, res) => {
    if(await Admin.findOne({where: {email:req.body.email}})) {
        return res.status(400).send({error: "Email already exists"})
    }

    const hashedPassword = await bcryptjs.hash(req.body.password, 8)
    const adminCreated = await Admin.create({name: req.body.name, lastName: req.body.lastName, email: req.body.email, password: hashedPassword})

    let id = adminCreated.id
    let email = adminCreated.email
    const token = jwt.sign({id, email}, secretToken, {expiresIn: '1d'})
    
    adminCreated.token = token
    adminCreated.save()
    res.send({token, expiresIn: '1d'})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    let admin = await Admin.findOne({where: {email}})
    if(admin) {
        if(bcryptjs.compareSync(password, admin.password)) {
            let id = admin.id
            const token = jwt.sign({id, email}, secretToken, {expiresIn: '1d'})
            admin.token = token
            admin.save()
            res.send({token, expiresIn: '1d'})
        }else {
            return res.send({error: "Wrong email or password"})
        }
    }else {
        return res.send({error: "Wrong email or password"})
    }
})

router.post('/logout', auth, async (req, res) => {
    req.admin.token = null
    req.admin.save()
    res.send('Logout!')
})

router.get('/me', auth, async (req, res) => {
    res.send(req.admin)
})

module.exports = router