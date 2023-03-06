const asyncHandler = require('express-async-handler')

const Notif = require('../models/notif.model')

// @desc Get notifications
// @route GET /api/notifs
// @access Private
const getNotifs = asyncHandler( async (req, res) => {
    const notifs = await Notif.find({ reservation: req.params.id }).sort('-createdAt')

    res.status(200).json(notifs)
})

// @desc Get all notifications
// @route GET /api/notifs/all
// @access Public
const getAllNotifs = asyncHandler( async (req, res) => {
    const notifs = await Notif.find().sort('-createdAt')

    res.status(200).json(notifs)
})

// @desc Get notifications for org adviser/head of office
// @route GET /api/notifs/head
// @access Private
const getHeadNotifs = asyncHandler( async (req, res) => {

    let respooff

    if(req.user.role === 'Organization Adviser'){
        respooff = 'Student Officer'
    } else if(req.user.role === 'Head of Office'){
        respooff = 'Faculty'
    }
    const notifs = await Notif.find({ restatus: req.user.role }).sort('-createdAt')

    res.status(200).json(notifs)
})

// @desc Get notifications for department deans
// @route GET /api/notifs/dean
// @access Private
const getDeanNotifs = asyncHandler( async (req, res) => {

    let respooff

    if(req.body.updrole === 'Organization Adviser'){
        respooff = 'Organization Adviser'
    } else if(req.body.updrole === 'Head of Office'){
        respooff = 'Head of Office'
    }
    const notifs = await Notif.find({ updrole: 'Organization Adviser', restatus: req.user.role }).sort('-createdAt')

    res.status(200).json(notifs)
})

// @desc Get notifications for department osas
// @route GET /api/notifs/osas
// @access Private
const getOsasNotifs = asyncHandler( async (req, res) => {

    const notifs = await Notif.find({ updrole: 'Department Dean' }).sort('-createdAt')

    res.status(200).json(notifs)
})

// @desc Get notifications for venue in-charge
// @route GET /api/notifs/venic
// @access Private
const getCheckNotifs = asyncHandler( async (req, res) => {

    let venrespo

    if(req.user.role === 'Gym In-Charge'){
        venrespo = 'James Ter Mier Gymnasium'
    } else if(req.user.role === 'Outdoor Stage In-Charge'){
        venrespo = 'Open Stage'
    } else if(req.user.role === 'Friendship Park In-Charge'){
        venrespo = 'Friendship Park'
    }

    const notifs = await Notif.find({resven: venrespo}).sort('-createdAt')

    res.status(200).json(notifs)
})

// @desc Set notifications
// @route POST /api/notifs
// @access Private
const setNotif = asyncHandler( async (req, res) => {

    const notif = await Notif.create({
        reservation: req.body.resid,
        resact: req.body.activity,
        resorg: req.body.org,
        resven: req.body.venue,
        resdate: req.body.date,
        restime_in: req.body.time_in,
        restime_out: req.body.time_out,
        restatus: req.body.status,
        requestor: req.body.requestor,
        updid: req.user.id,
        updby: req.user.name,
        updrole: req.user.role,
        sign: req.body.sign,
        remarks: req.body.remarks,
    })

    res.status(200).json(notif)
})


module.exports = {
    getNotifs,
    getAllNotifs,
    setNotif,
    getHeadNotifs,
    getDeanNotifs,
    getOsasNotifs,
    getCheckNotifs,
}