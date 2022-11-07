const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

// @desc Register a user
// @route POST /api/users
// @access Private
const registerUser = asyncHandler(async(req, res) =>{
    const { name, idnum, password, role, org, dept } = req.body

    if(!name || !idnum || !password || !role || !org || !dept){
        res.status(400)
        throw new Error('Please add input data')
    }

    // checking existing user
    const userExists = await User.findOne({idnum})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        idnum,
        password: hashedPass,
        role,
        org,
        dept,

    })
    
    if(user){
        res.status(201)
    }
})

// @desc Login
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) =>{
    const {idnum, password} = req.body

    // check idnum
    const user = await User.findOne({idnum})

    // check password
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            idnum: user.idnum,
            role: user.role,
            org: user.org,
            dept: user.dept,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) =>{
    const me = await User.findOne({idnum})
    
    res.status(200).json(me)
})

// @desc Get user data
// @route GET /api/users/all
// @access Private
const getAll = asyncHandler(async(req, res) =>{
    const users = await User.find({user: req.user.id})
    
    res.status(200).json(users)
})


// generate jwt
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAll,
}
