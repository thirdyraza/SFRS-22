const asyncHandler = require('express-async-handler')

const Notif = require('../models/notif.model')

// @desc Get notifications
// @route GET /api/notifs
// @access Private
const getNotifs = asyncHandler( async (req, res) => {
    const notifs = await Notif.find({ reservation: req.reserve.id })

    res.status(200).json(notifs)
})

// @desc Set notifications
// @route POST /api/notifs
// @access Private
const setNotif = asyncHandler( async (req, res) => {

    const notif = await Notif.create({
        resact: req.body.activity,
        resorg: req.body.org,
        resven: req.body.venue,
        resdate: req.body.date,
        restime_in: req.body.time_in,
        restime_out: req.body.time_out,
        user: req.user.id,
        requestor: req.user.name,
        reqrole: req.user.role,
    })

    res.status(200).json(notif)
})


module.exports = {
    getNotifs,
    setNotif,
}