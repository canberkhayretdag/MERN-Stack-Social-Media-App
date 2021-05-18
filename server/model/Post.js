const { number } = require('joi');
const mongoose = require('mongoose')
var Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    name : {
        type: String,
        required: true  
    },
    description: {
        type: String
    },
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref:'User' }
    ],
    tags: [
        { type: Number }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);