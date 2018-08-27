const mongoose = require('./connectionBase').connection
const dateTime = require('node-datetime')

//MEME
const memeSchema = new mongoose.Schema({
    user: {
        type: String
    }, // name of the person
    title: {
        type: String
    },
    image: {
        type: String
    }, //url of the image
    comments: {
        type: [String]
    }, //array of comment IDs
    tags: [{
        type: [String]
    }],
    datePosted: {
        type: String
    }, //date the post was created
    isPrivate: {
        type: Boolean
    },
    sharedUser: {
        type: String
    }
})

const memeModel = mongoose.model('posts', memeSchema)

function uploadMeme(memeTitle, memeImageLink, memePoster, memeTags, memeVisibility, sharedUser, callback) {
    // console.log('upload meme entered')
    var dt = dateTime.create()
    var dtFormat = dt.format('m/d/Y')
    var trimmedTags = []

    for (var i = 0; i < memeTags.length; i++) {
        var tagString = memeTags[i]
        // console.log(typeof tagString)
        // console.log(tagString.trim())
        trimmedTags.push(tagString.trim())
        // console.log(trimmedTags)
    }
    // console.log('-----------------------')
    if (sharedUser !== null) {
        // console.log('Shared User')
        // console.log(trimmedTags)
        const memeInstance = memeModel({
            user: memePoster,
            title: memeTitle,
            image: memeImageLink,
            comments: [],
            tags: trimmedTags,
            datePosted: dtFormat,
            isPrivate: memeVisibility,
            sharedUser: sharedUser
        })
        memeInstance.save(function (err, inv) {
            // console.log('meme saved')
            if (err) return console.error(err)

            callback()
        })
    } else {
        // console.log('No Shared User')
        console.log(trimmedTags)
        const memeInstance = memeModel({
            user: memePoster,
            title: memeTitle,
            image: memeImageLink,
            comments: [],
            tags: memeTags,
            datePosted: dtFormat,
            isPrivate: memeVisibility
        })
        memeInstance.save(function (err, inv) {
            // console.log('meme saved')
            if (err) return console.error(err)

            callback()
        })
    }
    // console.log('meme instance created')


}

module.exports.uploadMeme = uploadMeme

function viewAllPublicMemes(callback) {
    const searchQuery = {
        isPrivate: false
    }
    memeModel.find(searchQuery, function (err, list) {
        if (err) return console.error(err);
        callback(list)
    })
}

module.exports.viewAllPublicMemes = viewAllPublicMemes

function viewAvailableMemes(user, callback) {
    const publicMemesQuery = {
        isPrivate: false
    }
    const myMemesQuery = {
        user: user
    }
    const sharedMemesQuery = {
        sharedUser: user
    }
    memeModel.find({
        $or: [publicMemesQuery, myMemesQuery, sharedMemesQuery]
    }, function (err, list) {
        if (err) return consoler.error(err);
        callback(list)
    })
}

module.exports.viewAvailableMemes = viewAvailableMemes

function viewMemesbySearchTag(user, tags, callback) {
    const publicMemesQuery = {
        isPrivate: false
    }
    const myMemesQuery = {
        user: user
    }
    const sharedMemesQuery = {
        sharedUser: user
    }
    const tagMemesQuery = {
        tags: tags
    }
    memeModel.find({
        $and: [tagMemesQuery, {
            $or: [publicMemesQuery, myMemesQuery, sharedMemesQuery]
        }]
    }, function (err, list) {
        if (err) return consoler.error(err);
        callback(list)
    })
}

module.exports.viewMemesbySearchTag = viewMemesbySearchTag;

function addCommentID(commentID, callback){
    var toInsert = commentID
    memeModel.update({ "_id": ObjectID("5b82aa2df573220b18e5a4a9")},  // TESTING
    {$push: {comments: "hello"}} // ADD COMMENT ID
)
}

function viewAllProfileMemes() {

}

// //SEARCHING BY NAME AND TAG
// function viewMemesbySearchName(){

// }

// function editMeme(){

// }

// function deleteMeme(){

// }