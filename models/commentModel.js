const mongoose = require('./connectionBase').connection
const dateTime = require('node-datetime')

//MEME
const commentSchema = new mongoose.Schema({
    user: {type: String},
    comment: {type: String},
    datePosted: {type: String},
    parentComment: {type: String}
})

const commentModel = mongoose.model('comments', commentSchema)

function addComment(userV, commentV, pcommentV, callback){
    var dt = dateTime.create()
    var dtFormat = dt.format('m/d/Y')
    
    const commentInstance = commentModel({
        user: userV,
        comment: commentV,
        datePosted: dtFormat,
        parentComment: pcommentV
    })
    
    commentInstance.save(function (err, inv) {
        if (err)  return console.error(err)
        callback()
    })
}

module.exports.addComment = addComment

function viewComments(callback){
    commentModel.find(function(err,list){
        if(err) return console.error(err);
        callback(list)
    })
}

module.exports.viewComments = viewComments