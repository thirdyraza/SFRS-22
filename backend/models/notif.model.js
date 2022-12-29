const mongoose = require('mongoose');

const notifSchema = mongooseSchema({
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Reserve'
    },
    requestor: {
        type: String,
        required: true
    },
    reqrole: {
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
}, {
    timestamps: true
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

module.exports = mongoose.model('Notif', notifSchema)