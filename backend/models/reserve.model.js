const mongoose = require('mongoose')

const reserveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    requestor: {
        type: String,
        required: true
    },
    reqrole: {
        type: String,
    },
    reqdept: {
        type: String
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject']
    },
    org: {
        type: String,
        required: [true, 'Please choose an organization']
    },
    bldg: {
        type: String,
        required: [true, 'Please choose a building']
    },
    room: {
        type: String,
        required: [true, 'Please add a room']
    },
    date: {
        type: String,
        required: [true, 'Please add a date']
    },
    time_in: {
        type: String,
        required: [true, 'Please add a starting time']
    },
    time_out: {
        type: String,
        required: [true, 'Please add an ending time']
    },
    status: {
        type: String,
        enum: ["Not Approved", "Approved by Dean", "Approved by OSAS Staff", "Approved by OSAS Director", "Approved by Venue-In-Charge"]
    },

}, {
    timestamps: true,
})

reserveSchema.virtual('requestor-name', {
    ref: 'User',
    localField: 'requestor',
    foreignField: 'name',
    },
)

reserveSchema.virtual('requestor-role', {
    ref: 'User',
    localField: 'reqrole',
    foreignField: 'role',
    },
)

reserveSchema.virtual('requestor-dept', {
    ref: 'User',
    localField: 'reqdept',
    foreignField: 'dept',
    },
)

module.exports = mongoose.model('Reserve', reserveSchema)