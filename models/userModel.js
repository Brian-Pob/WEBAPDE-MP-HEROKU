const mongoose = require('./connectionBase').connection
const dateTime = require('node-datetime')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    user: {
        type: String
    },
    pass: {
        type: String
    },
    datejoined: {
        type: String
    },
    profilePic: {
        type: String
    },
    profileDesc: {
        type: String
    },
    posts: {
        type: [String]
    }
}, {
    versionKey: false
})

const userModel = mongoose.model('users', userSchema)

//functions
function createUser(usernameInput, passwordInput, descriptionInput, picInput, callback) {

    var dt = dateTime.create();
    var dtFormat = dt.format('m/d/Y')

    const userInstance = userModel({
        user: usernameInput,
        pass: crypto.createHash('md5').update(passwordInput).digest('hex'),
        datejoined: dtFormat,
        profilePic: picInput,
        profileDesc: descriptionInput,
        posts: []
    })

    userInstance.save(function (err, res) {
        if (err) return console.error(err)
        else {
            // req.session.user = userInstance.user
            callback()
        }

    })

}
module.exports.createUser = createUser

function loginUser(usernameInput, passwordInput, callback){
    const searchQuery = {
        user: usernameInput,
        pass: crypto.createHash('md5').update(passwordInput).digest('hex')
    }

    userModel.findOne(searchQuery, function (err, logindata) {
        if (err) return console.error(err)
        // if (logindata !== undefined && logindata._id !== null) {
        //     // resp.redirect('/?login=success')
        //     // req.session.user = logindata.user
        //     // console.log(req.session.user)

        //     // resp.render('./index', {
        //     //     data: logindata
        //     // })
        //     callback(logindata)
        // } else {
        //     // resp.redirect('/?login=failed')
        //     data = {loggedin : false}
        //     callback(data)
        // }
        // console.log('checking logindata: ')
        // console.log(logindata != undefined)
        // console.log(logindata !== undefined)
        callback(logindata != undefined && logindata._id != null)
        // callback(logindata !== undefined)
    })
}

module.exports.loginUser = loginUser

function searchForProfile(idUser, callback){
    const searchQuery = {user : idUser}

    userModel.findOne(searchQuery, function(err, user){
        if (err) return console.error(err);
        callback(user)
    })
    
}

module.exports.searchForProfile = searchForProfile

function getUserList(callback){
    userModel.find({}, function(err, userList){
        if (err) return console.error(err);
        callback(userList)
    })
}

module.exports.getUserList = getUserList

// // function editProfileDesc(idUser, editFile, callback){
// //     const searchQuery = {user : idUser}

// //     var oldDesc = { profileDesc: searchQuery.profileDesc}
// //     var newDesc = { $set: {profileDesc : editFile} }

// //     userModel.update(oldDesc, newDesc, function(err, prof){
// //         if (err) return console.error(err);
// //         callback(prof != null)
// //     })
// // }

// // module.exports.editProfileDesc = editProfileDesc

// // function editProfilePic(idUser, editFile, callback){
// //     const searchQuery = {user : idUser}

// //     var oldPic = { profilePic: searchQuery.profilePic}
// //     var newPic = { $set: {profilePic : editFile} }

// //     userModel.update(oldPic, newPic, function(err, prof){
// //         if (err) return console.error(err);
// //         callback(prof != null)
// //     })
// // }

// module.exports.editProfilePic = editProfilePic




function checkIfExists(user, callback){
    const searchQuery = {
        user: user
    }
    userModel.findOne(searchQuery, function(err, userResult){
        if (err) return console.error(err);
        callback(userResult)
    })
}
module.exports.checkIfExists = checkIfExists
