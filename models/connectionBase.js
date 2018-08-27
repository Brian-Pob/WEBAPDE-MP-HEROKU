const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/memedb', {useNewUrlParser: true})

module.exports.connection = mongoose