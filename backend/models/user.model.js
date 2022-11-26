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
        User: Number,
        Admin: Number
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