const mongoose = require('mongoose')

const withdrawSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'waiting'
    }
}, { timestamps: true })

mongoose.model("Withdraw", withdrawSchema)