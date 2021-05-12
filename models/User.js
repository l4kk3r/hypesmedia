const mongoose = require('mongoose')

const instagramData =  new mongoose.Schema({
    account: String, 
    followers: Number,
    avatar: String
})

const userSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'waiting'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    instagram: instagramData,
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

mongoose.model("User", userSchema)