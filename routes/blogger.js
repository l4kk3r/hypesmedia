const express = require('express')
const ejs = require('ejs')
const axios = require('axios')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const router = express.Router()
const redirectIfNotAuthenticated = require('../middleware/redirectIfNotAuthenticated')
const getUser = require('../middleware/getUser')


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if (!user) {
        req.flash('errorMessage', 'Неправильный логин или пароль')
    }

    if (!(user.password === password)) {
        req.flash('errorMessage', 'Неправильный логин или пароль')
    }

    if (!(user.status === 'active_blogger')) {
        req.flash('errorMessage', 'Ваш аккаунт ещё не активирован')
    }

    req.session.userId = user._id
    res.redirect('/blogger/panel')
})

router.post('/join', async (req, res) => {
    try {
        let user = new User(req.body)
        const instagramProfileData = await axios.get(`https://www.instagram.com/${req.body.instagram_account}/?__a=1`)
        const inagramProfileDataParsed = instagramProfileData.data.graphql.user
        const followers = inagramProfileDataParsed.edge_followed_by.count
        const avatar = inagramProfileDataParsed.profile_pic_url
        user.instagram = {account: req.body.instagram_account, followers, avatar}
        await user.save()
        req.flash('successMessage', 'Спасибо за регистрацию!')
    } catch (err) {
        req.flash('errorMessage', 'Ошибка!')
        console.log(err)
    }
    res.redirect('/join')
})

router.get('/panel', getUser, async (req, res) => {
    if (!req.session.userId) {
        res.render('blogger_login', {errorMessage: req.flash('errorMessage')})
    } else {
        res.render('blogger_panel_advertise', {user: req.user})
    }
})

router.get('/panel/withdraw', redirectIfNotAuthenticated, getUser, async (req, res) => {
    res.render('blogger_panel_withdraw', {user: req.user})
})

router.get('/', async (req, res) => {
    const users = await User.find({})
    return res.json({users})
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.json({user})
})

router.put('/:id', async (req, res) => {
    await User.updateOne({_id: req.params.id}, {$set: req.body})
    return res.json({message: 'Юзер успешно обновлён'})
})

module.exports = router