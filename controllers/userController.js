const userModel = require('../models/userModel')
const formidable = require('formidable');

const fs = require('fs');

function userModule(server) {

    server.post('/signup', function (req, resp) {
        
        var form = new formidable.IncomingForm()
        console.log('went into signup')
        form.parse(req, function(err, fields, files){
            console.log('went into form parse')
            
            var oldpath = files.inputProfileImage.path
            var newpath = __dirname + '/../public/imgs/upload/' + files.inputProfileImage.name

            fs.rename(oldpath, newpath, function (err) {
                var password = fields.inputPasswordSignup
                var username = fields.inputUsernameSignup
                var description = fields.inputDescriptionSignup   
                console.log('file transfer start')
                if (err) throw err;
                userModel.checkIfExists(username, function(userResult){
                    console.log('check if exists')
                    if(userResult == undefined){
                        userModel.createUser(username, password, description, files.inputProfileImage.name, function(){
                            req.session.user = username
                            resp.redirect('/')
                        })
                    }else{
                        resp.redirect('/?signup=exists')
                    }
                })

            })
        })
    })

    server.get('/visitprofile', function (req, resp) {
        
        var user = req.session.user
        
        userModel.searchForProfile(user, function (userData) {
            resp.render('./profilepage.ejs', {userData : userData})
        })
    })

    
    
}
module.exports.Activate = userModule;