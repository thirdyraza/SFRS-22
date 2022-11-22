const mongoose = require('mongoose')

const reserveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    purpose: {
        type: String,
        required: [true, 'Please add a purpose']
    },
    dept: {
        type: String,
        required: [true, 'Please choose a department']
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
        required: true
    },

}, {
    timestamps: true,
})

module.exports = mongoose.model('Reserve', reserveSchema)