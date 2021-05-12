const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const User = mongoose.model("User")
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/bloggers', async (req, res) => {
    bloggers = await User.find({status: "active_blogger"})
    res.render('bloggers', {bloggers})
})

router.get('/join', (req, res) => {
    res.render('join', {errorMessage: req.flash('errorMessage'), successMessage: req.flash('successMessage')})
})

router.get('/join_success', (req, res) => {
    res.render('register_success')
})

router.get('/advertisers', (req, res) => {
    res.render('advertisers')
})

module.exports = router