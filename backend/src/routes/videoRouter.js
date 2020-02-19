const express = require('express')
const router = new express.Router()

const fs = require('fs')
const path = require('path')

const multer = require('multer')

const Video = require('../models/video')
const Contest = require('../models/contest')

const auth = require('../auth/auth')

const video = multer({
    dest: "resources/unprocessed",
    fileFilter(req, file, callback) {
        let formats = [".AVI", ".WMV", ".FLV", ".MP4"]
        let allformats = formats.map(e => e.toLowerCase()).concat(formats)

        if (allformats.find(e => file.originalname.endsWith(e))) {
            callback(undefined, true)
        } else {
            callback(new Error('File should have video format such as '+formats.join(",")))
        }
    }
})

router.post('/:contesturl/upload', video.single('video') ,async (req, res) => { //multipart/form-data
    let fullPath = path.join(req.file.destination, req.file.originalname)
    fs.renameSync(req.file.path, fullPath)
    try {
        let contest = await Contest.findOne({ where: { url: "/" + req.params.contesturl } })
        if(contest) {
            let video = await Video.create({
                ...req.body, //email,name,lastName,message
                isConverted: 0,
                originalPath: fullPath,
                convertedPath: "resources/converted/"+req.file.originalname
            })
            contest.addVideo(video)
            res.status(201).send(video)
        }else {
            res.status(400).send({ error: "Contest not found" })
        }
    } catch (e) {
        res.status(500).send({ error: e })
    }
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/videos/:contesturl', async (req, res) => {
    let contest = await Contest.findOne({ where: { url: "/"+req.params.contesturl } })

    if(!req.query.skip || !req.query.limit) {
        return res.status(400).send({ error: "Skip and limit query params are mandatory and different from zero" })
    }

    if(contest) {
        let videos = await Video.findAll({
            offset: parseInt(req.query.skip),
            limit: parseInt(req.query.limit),
            where: { ContestId: contest.id, isConverted: 1 },
            order: [ ['createdAt', 'DESC'] ]
        })
        res.send(videos)
    }else {
        res.status(400).send({ error: "Contest not found, check url or credentials" })
    }

})

router.get('/:contesturl/count', auth, async (req, res) => {
    try {
        let contest = await Contest.findOne({ where: { url: "/"+req.params.contesturl, AdminId: req.admin.id } })
        let videosCount = await Video.count({
            where: { ContestId: contest.id }
        })
        return res.send({count:videosCount})
    } catch (e) {
        return res.send(400).send({ error: "Contest not found, check url or credentials" })
    }
})

module.exports = router
