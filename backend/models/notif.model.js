const mongoose = require('mongoose');

const notifSchema = mongoose.Schema({
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'What reservation is this?'],
        ref: 'Reserve'
    },
    updid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User not found'],
        ref: 'User'
    },
    updby: {
        type: String,
        required: true
    },
    updrole: {
        type: String,
    },
    resact: {
        type: String,
        required: [true, 'Please add a activity']
    },
    resorg: {
        type: String,
        required: [true, 'Please choose an organization']
    },
    resven: {
        type: String,
        required: [true, 'Please choose a venue']
    },
    resdate: {
        type: String,
        required: [true, 'Please add a date']
    },
    restime_in: {
        type: String,
        required: [true, 'Please add a starting time']
    },
    restime_out: {
        type: String,
        required: [true, 'Please add an ending time']
    },
    restatus: {
        type: String,
        required: [true, 'Check the status']
    },
    remarks: {
        type: String,
        required: [true, 'Please add remarks']
    },
    sign: {
        type: String,
    }
}, {
    timestamps: true
})

notifSchema.virtual('update-name', {
    ref: 'User',
    localField: 'updby',
    foreignField: 'name',
    },
)

notifSchema.virtual('update-role', {
    ref: 'User',
    localField: 'updrole',
    foreignField: 'role',
    },
)

module.exports = mongoose.model('Notif', notifSchema)