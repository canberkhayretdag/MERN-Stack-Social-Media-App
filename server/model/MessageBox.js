const mongoose = require('mongoose')

const messageBoxSchema = new mongoose.Schema({
    combinedName: {
        type: String
    },
    firstUser: {
    	type: String
    },
    secondUser: {
    	type: String
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId, ref:'Message'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('MessageBox', messageBoxSchema);