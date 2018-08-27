const mongoose = require('mongoose')
mongoose.connect('mongodb://brian:abc123@ds235352.mlab.com:35352/memedb', {useNewUrlParser: true})

module.exports.connection = mongoose