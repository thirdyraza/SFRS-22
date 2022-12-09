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
    reqid: {
        type: String,
        required: true
    },
    reqrole: {
        type: String,
    },
    reqdept: {
        type: String
    },
    activity: {
        type: String,
        required: [true, 'Please add a activity']
    },
    org: {
        type: String,
        required: [true, 'Please choose an organization']
    },
    venue: {
        type: String,
        required: [true, 'Please choose a venue']
    },
    room: {
        type: String,
        required: [true, 'Please add a room']
    },
    date: {
        type: Date,
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
        enum: ["Successfully Reserved", "Department Dean", "OSAS Staff", "OSAS Director", "Venue In-Charge", "Head of Office", "Organization Adviser", "Denied", "Cancelled"]
    },
    counter:{
        type: Number,
    }

}, {
    timestamps: true,
})

reserveSchema.virtual('requestor-name', {
    ref: 'User',
    localField: 'requestor',
    foreignField: 'name',
    },
)

reserveSchema.virtual('requestor-idnum', {
    ref: 'User',
    localField: 'reqid',
    foreignField: 'idnum',
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