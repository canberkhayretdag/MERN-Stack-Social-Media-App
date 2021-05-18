const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {
    	type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    content: {
    	type: String
    },
    messageBox: {
        type: mongoose.Schema.Types.ObjectId, ref:'MessageBox'
    },
    seen: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', messageSchema);