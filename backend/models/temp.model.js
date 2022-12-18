const mongoose = require('mongoose')

const tempSchema = mongoose.Schema({
    tempVenue: {
        type: String,
    },
    tempRoom: {
        type: String,
    },
    tempDate: {
        type: String,
    },
})

module.exports = mongoose.model('Temp', tempSchema)