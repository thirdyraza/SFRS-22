const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    text: {
        type: String,
        required: [true, 'Please add a text']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema)