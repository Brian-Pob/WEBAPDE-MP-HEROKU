const express = require('express')

const server = express()
server.use(express.urlencoded({
    extended: true
}))
server.use(express.json())

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({
    extended: true
}))
server.use(bodyParser.json())
// const crypto = require('crypto')

const session = require('express-session')
const mongoStore = require('connect-mongo')(session)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/memedb', {
    useNewUrlParser: true
})
const formidable = require('formidable')
server.use(session({
    secret: 'memes',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60,
        autoRemove: 'native'
    })
}))

server.use(express.static(__dirname + '/public'));
server.set('view engine', 'ejs')


const controllers = ['user', 'meme', 'load', 'comment']
for(var i = 0; i < controllers.length; i++){
    const mdl = require('./controllers/'+controllers[i]+'Controller')
    mdl.Activate(server)
}


const port = process.env.PORT | 9090
server.listen(port)