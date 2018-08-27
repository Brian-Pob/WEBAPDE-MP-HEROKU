const userModel = require('../models/userModel')
const memeModel = require('../models/memeModel')
const formidable = require('formidable')

function loadModule(server){

    server.get('/', function (req, resp) {
        // console.log('went here')
        
        if (req.session.user === undefined) {
            if(req.query.login !== undefined && req.query.login === 'failed'){
            
                memeModel.viewAllPublicMemes(function(list){
                    var data = {
                        list: list,
                        signupfailed: false,
                        loginfailed: true
                    }
                    resp.render('./index', {data: data})
                })
            }else if(req.query.signup !== undefined && req.query.signup === 'exists'){
                memeModel.viewAllPublicMemes(function(list){
                    var data = {
                        list: list,
                        signupfailed: true,
                        loginfailed: false
                    }
                    resp.render('./index', {data: data})
                })
            }else{
                memeModel.viewAllPublicMemes(function(list){
                    var data = {
                        list: list,
                        signupfailed: false,
                        loginfailed: false
                    }
                    resp.render('./index', {data: data})
                })
            }
           

        } else {
            var thisuser = req.session.user
            memeModel.viewAvailableMemes(thisuser, function(memeList){
                userModel.getUserList(function(userList){
                    var usernameList = []
                    for(var i=0; i<userList.length; i++){
                        usernameList.push(userList[i].user)
                    }
                    var data = {
                        user: req.session.user,
                        list: memeList,
                        usernameList: usernameList,
                        loginfailed: false
                    }
                    resp.render('./index', {data: data})
                })
            })
        }
    })

    server.post('/login', function (req, resp) {
        var password = req.body.inputPasswordLogin
        var username = req.body.inputUsernameLogin

        userModel.loginUser(username, password, function(result){
            if(result){
                
                req.session.user = username
                resp.redirect('/')
            }
            else{
                resp.redirect('/?login=failed')
            }
                
        })
        
    })

    server.get('/logout', function (req, resp) {

        req.session.destroy()
        // var data = {
        //     user: null,
        //     list: req.data.list
        // }
        // console.log('should be logged out')
        resp.redirect('/')
    })

    server.get('/visitabout', function (req, resp) {
            resp.redirect('./about.ejs')
    })
}

module.exports.Activate = loadModule