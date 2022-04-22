/*
    User:{
        userId: string,
        createdOn: timeStamp,
    }
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)