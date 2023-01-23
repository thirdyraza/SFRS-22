const asyncHandler = require('express-async-handler')

const Reserve = require('../models/reserve.model')

// @desc Get own reservations
// @route GET /api/reserves
// @access Private
const getReserves = asyncHandler( async (req, res) => {
    const reserves = await Reserve.find({ user: req.user.id })

    res.status(200).json(reserves)
})
const getReservesDash = asyncHandler( async (req, res) => {
    const reserves = await Reserve.find({ user: req.user.id })

    res.status(200).json(reserves).limit(5)
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
    if(!req.body.activity){
        return res.status(400).json({message: 'Provide an activity'})
    }

    let respo

    if(req.user.role === 'Student Officer'){
        respo = 'Organization Adviser'
    } else if(req.user.role === 'Faculty'){
        respo = 'Head of Office'
    }

    const reserve = await Reserve.create({
        activity: req.body.activity,
        purpose: req.body.purpose,
        org: req.body.org,
        venue: req.body.venue,
        room: req.body.room,
        date: req.body.date,
        time_in: req.body.time_in,
        time_out: req.body.time_out,
        equipment: req.body.equipment,
        status: respo,
        level: "Pending",
        counter: 0,
        user: req.user.id,
        requestor: req.user.name,
        reqid: req.user.idnum,
        reqrole: req.user.role,
        reqdept: req.user.dept,
    })

    res.status(200).json(reserve)
})

// @desc Update reservation status
// @route PUT /api/reserves:id
// @access Private
const updateReserve = asyncHandler( async (req, res) => {
    const {review} = req.body
    const reserve = await Reserve.findById(req.params.id)

    if(!reserve){
        return res.status(400).json({message: 'Reservation not found'})
    }

    let updStat = reserve.status
    let ctr = reserve.counter

    if(review === 'Approve'){
        if(reserve.status === 'Head of Office' || reserve.status === 'Organization Adviser') {
            updStat = 'Department Dean'
            ctr +=1
        } else if(reserve.status === 'Department Dean') {
            updStat = 'OSAS Dean'
            ctr +=1
        }else if(reserve.status === 'OSAS Dean'){
            updStat = 'Successfully Reserved'
            ctr +=1
        }
    }
    else if(review === 'Deny'){
        updStat = 'Denied'
        ctr = 0
    }else if(review === 'Cancel'){
        updStat = 'Cancelled'
        ctr = 0
    }

    const updatedReserve = await Reserve.findByIdAndUpdate(req.params.id, {status: updStat, counter: ctr, level: req.body.level}, {new: true})
    return res.status(200).json(updatedReserve)
})

// @desc Delete reservation
// @route DELETE /api/reserves:id
// @access Private
const deleteReserve = asyncHandler( async (req, res) => {
    const reserve = await Reserve.findById(req.params.id)

    if(!reserve){
        return res.status(400).json({message: 'reservation not found'})
    }

    // logged in user = reservation owner
    if(reserve.user.toString() !== req.user.id){
        return res.status(400).json({message: 'User not authorized'})
    }

    await reserve.remove()
    return res.status(200).json({ id: req.params.id })
})

// @desc Get all reservation
// @route GET /api/reserves/all
// @access Private
const getAllReserves = asyncHandler(async(req, res) =>{
    Reserve.find()
        .then(allReserves => {
             return res.status(200).json(allReserves)
        }).catch(err=>{
            return res.status(500).json({
                message:err.message || "Can't retrieve all reservations"
            })
        })

})

// @desc Get reservation for review
// @route GET /api/reserves/review
// @access Private
const getForReview = asyncHandler( async (req, res) => {

    let respooff

    if(req.user.role === 'Organization Adviser'){
        respooff = req.user.org
    } else if(req.user.role === 'Head of Office'){
        respooff = req.user.org
    }
    
    const forReview = await Reserve.find({status: req.user.role, org: respooff}).sort('-updatedAt')

    res.status(200).json(forReview)
})
const getForReviewDash = asyncHandler( async (req, res) => {

    let respooff

    if(req.user.role === 'Organization Adviser'){
        respooff = req.user.org
    } else if(req.user.role === 'Head of Office'){
        respooff = req.user.org
    }
    
    const forReview = await Reserve.find({status: req.user.role, org: respooff}).sort('-updatedAt').limit(3)

    res.status(200).json(forReview)
})

// @desc Get reservation for checking
// @route GET /api/reserves/check
// @access Private
const getForCheck = asyncHandler( async (req, res) => {

    let venrespo

    if(req.user.role === 'Gym In-Charge'){
        venrespo = 'James Ter Mier Gymnasium'
    } else if(req.user.role === 'Outdoor Stage In-Charge'){
        venrespo = 'Open Stage'
    } else if(req.user.role === 'Friendship Park In-Charge'){
        venrespo = 'Friendship Park'
    }
    
    const forCheck = await Reserve.find({venue: venrespo}).sort('-updatedAt')

    res.status(200).json(forCheck)
})
const getForCheckDash = asyncHandler( async (req, res) => {

    let venrespo

    if(req.user.role === 'Gym In-Charge'){
        venrespo = 'James Ter Mier Gymnasium'
    } else if(req.user.role === 'Outdoor Stage In-Charge'){
        venrespo = 'Open Stage'
    } else if(req.user.role === 'Friendship Park In-Charge'){
        venrespo = 'Friendship Park'
    }
    
    const forCheck = await Reserve.find({venue: venrespo}).sort('-updatedAt').limit(3)

    res.status(200).json(forCheck)
})

// @desc Get reservation for checking (department-wise)
// @route GET /api/reserves/check
// @access Private
const getForDean = asyncHandler( async (req, res) => {
    
    const forDean = await Reserve.find({status: req.user.role, reqdept: req.user.dept}).sort('-updatedAt')
    res.status(200).json(forDean)
})

const getForDeanDash = asyncHandler( async (req, res) => {
    
    const forDean = await Reserve.find({status: req.user.role, reqdept: req.user.dept}).sort('-updatedAt').limit(3)
    res.status(200).json(forDean)

})

// @desc Get reservation for checking (department-wise)
// @route GET /api/reserves/check
// @access Private
const getForOsas = asyncHandler( async (req, res) => {
    
    const forOsas = await Reserve.find({status: req.user.role}).sort('-updatedAt')
    res.status(200).json(forOsas)
})

const getForOsasDash = asyncHandler( async (req, res) => {
    
    const forOsas = await Reserve.find({status: req.user.role}).sort('-updatedAt').limit(3)
    res.status(200).json(forOsas)

})

const getApproved = asyncHandler(async(req, res) => {
    const approved = await Reserve.find({status: 'Successfully Reserved'})
    res.status(200).json(approved)
})

const getCancelled = asyncHandler(async(req, res) => {
    const cancelled = await Reserve.find({status: 'Cancelled'})
    res.status(200).json(cancelled)
})

const getDenied = asyncHandler(async(req, res) => {
    const denied = await Reserve.find({status: 'Denied'})
    res.status(200).json(denied)
})

const getSorted = asyncHandler(async(req, res) => {
    
    const sortedRes = await Reserve.find({level: req.body.active})
    res.status(200).json(sortedRes)
})

module.exports = {
    getReserves,
    getReservesDash,
    getReservation,
    setReserve,
    updateReserve,
    deleteReserve,
    getAllReserves,
    getForReview,
    getForReviewDash,
    getForCheck,
    getForCheckDash,
    getForDean,
    getForDeanDash,
    getForOsas,
    getForOsasDash,
    getApproved,
    getCancelled,
    getDenied,
    getSorted
}