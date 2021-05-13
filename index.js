const express = require('express')
const cors = require('cors')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo');
const app = express()

global.loggedIn = null;

const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(flash())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin:admin@fekacluster.4nf6p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log('mongoconnected')
})
mongoose.connection.on('error',()=>{
    console.log('mongoerrored')
})

// Express Session
app.use(expressSession({
    secret: 'some_secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    store: new MongoStore({mongoUrl: 'mongodb+srv://admin:admin@fekacluster.4nf6p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'}),
}))

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

require('./models/User')
require('./models/Withdraw')

const bloggerRouter = require('./routes/blogger')
const mainRouter = require('./routes/main')
app.use('/blogger', bloggerRouter)
app.use('/', mainRouter)

app.listen(PORT, () => {
    console.log('app is running!')
})
