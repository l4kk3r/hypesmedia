const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = async (req, res, next) => {
    const user = await User.findById(req.session.userId)
    req.user = user
    next()
}