/*
    Question:{
        pollQuestion: string,
        Options: Array<string>
        by: userId
        votes: [
            {option: string, by: userId}
        ]
    }

 */
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    pollQuestion:{
        required: true,
        type: String
    },
    options:{
        required: true,
        default: [],
        type: [String]
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    votes:{
        type:[{
            option: Number,
            // this will be IP address of the user
            voted_by: { type: String }
        }],
        default: []
    }
})

module.exports = mongoose.model('Question', questionSchema)