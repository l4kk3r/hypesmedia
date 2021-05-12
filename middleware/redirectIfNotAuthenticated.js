const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/')
    }
    next()
}
