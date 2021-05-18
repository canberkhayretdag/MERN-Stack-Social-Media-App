const mongoose = require('mongoose')
var Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 120,
        min: 6
    },
    username: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 120,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    type: {
        type: Number, // is person photographer or not ?
        required: true,
        max: 2,
        min: 1
    },  
    bio: {
        type: String,
        default: "",
        max: 1000
    },  
    image: {
    	type: String,
    	max: 255
    },
    address: {
        type: Number       
    },
    date: {
        type: Date,
        default: Date.now
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref:'Post' }
    ]
})

module.exports = mongoose.model('User', userSchema);