const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
    	type: String
    },
    followed: {
    	type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Follow', followSchema);