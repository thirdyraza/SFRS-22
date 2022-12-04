const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    idnum: {
        type: String,
        required: [true, 'Please add an id number'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        required: [true, 'Please select a role'],
        enum: ["Faculty", "Student Officer", "OSAS Staff", "OSAS Director", "Venue-In-Charge", "Department Dean"]
    },
    org: {
        type: String,
        required: [true, 'Please add an organization'],
    },
    dept: {
        type: String,
        required: [true, 'Please add a deparment'],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)