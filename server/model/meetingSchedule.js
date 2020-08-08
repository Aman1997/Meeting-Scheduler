const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema({
    email: {
        type :String,
        maxlength: 50
    },
    emailWith: {
        type: String,
        maxlength: 50
    },
    date: {
        type: String
    },
    from: {
        type: Number
    },
    to: { 
        type: Number
    }
})

const Meetings = mongoose.model('Meetings', meetingSchema)
module.exports = { Meetings }