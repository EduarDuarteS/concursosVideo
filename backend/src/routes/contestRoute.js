const express = require('express')
const router = new express.Router()

const Contest = require('../models/contest')

const auth = require('../auth/auth')

router.post('/create', auth, async (req, res) => {
    try {
        let contest = await Contest.create({
            ...req.body
        })
        req.admin.addContest(contest)
        res.send(contest)
    }catch(e) {
        res.status(400).send({error: "URL maybe is not unique"})
    }
})

router.get('/show', auth, async (req, res) => {
    if(req.query.url) {
        return res.send(await Contest.findOne({ where: { url: "/"+req.query.url, AdminId: req.admin.id } }))
    }
    else if(req.query.id) {
        return res.send(await Contest.findOne({ where: { id: req.query.id, AdminId: req.admin.id } }))
    }
    else if(req.query.name) {
        return res.send(await Contest.findAll({ where: { name: req.query.name, AdminId: req.admin.id } }))
    }else {
        return res.send(await req.admin.getContests())
    }
})

router.get('/:url', async (req, res) => {
    let contest = await Contest.findOne({ where: { url: "/"+req.params.url } })
    if(contest) {
        return res.send(contest)
    }else {
        return res.status(400).send({error: true})
    }

})

router.put('/update/:id', auth, async (req, res) => {
    let id = req.params.id

    const contest = await Contest.update({
        ...req.body
    }, { where: { id, AdminId: req.admin.id } })

    if (contest[0] === 0) {
        return res.status(400).send({ error: "Couldn't update, please check credentials and payload" })
    } else {
        return res.send(req.body)
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    let id = req.params.id

    try {
        const contest = await Contest.destroy({ where: { id, AdminId: req.admin.id } })
        if (contest===0) {
            return res.status(400).send({ error: "Couldn't delete, please check credentials" })
        }
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router