const asyncHandler = require('express-async-handler')

const Reserve = require('../models/reserve.model')

// @desc Get reservations
// @route GET /api/reserves
// @access Private
const getReserves = asyncHandler( async (req, res) => {
    const reserves = await Reserve.find({ user: req.user.id }).populate('requestor-name')

    res.status(200).json(reserves)
})

// @desc Get one reservation
// @route GET /api/reserves:id
// @access Private
const getReservation = asyncHandler(async(req, res) =>{
    const reservation = await Reserve.findById(req.params.id)
    
    res.status(200).json(reservation)
})

// @desc Set reservations
// @route POST /api/reserves
// @access Private
const setReserve = asyncHandler( async (req, res) => {
    if(!req.body.subject){
        res.status(400)
        throw new Error('Please provide a subject')
    }

    const reserve = await Reserve.create({
        subject: req.body.subject,
        org: req.body.org,
        bldg: req.body.bldg,
        room: req.body.room,
        date: req.body.date,
        time_in: req.body.time_in,
        time_out: req.body.time_out,
        status: 'Not Approved',
        user: req.user.id,
        requestor: req.user.name,
        reqrole: req.user.role,
        reqdept: req.user.dept,
    })

    res.status(200).json(reserve)
})

// @desc Update reservation status
// @route PUT /api/reserves:id
// @access Private
const updateReserve = asyncHandler( async (req, res) => {
    const reserve = await Reserve.findById(req.params.id)

    if(!reserve){
        res.status(400)
        throw new Error('Reservation not found')
    }
    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // logged in user = reservation owner
    if(reserve.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedReserve = await Reserve.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res. status(200).json(updatedReserve)
})

// @desc Delete reservation
// @route DELETE /api/reserves:id
// @access Private
const deleteReserve = asyncHandler( async (req, res) => {
    const reserve = await Reserve.findById(req.params.id)

    if(!reserve){
        res.status(400)
        throw new Error('Reservation not found')
    }
    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // logged in user = reservation owner
    if(reserve.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await reserve.remove()
    res.status(200).json({ id: req.params.id })
})

// @desc Get all reservation
// @route GET /api/reserves/all
// @access Private
const getAllReserves = asyncHandler(async(req, res) =>{
    Reserve.find()
        .then(allReserves => {
            res.status(200).json(allReserves)
        }).catch(err=>{
            res.status(500).json({
                message:err.message || "Can't retrieve all reservations"
            })
        })

})

module.exports = {
    getReserves,
    getReservation,
    setReserve,
    updateReserve,
    deleteReserve,
    getAllReserves
}