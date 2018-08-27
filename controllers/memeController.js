const memeModel = require('../models/memeModel')
const formidable = require('formidable');
const bodyParser = require('body-parser')
const fs = require('fs');


function memeModule(server) {

    server.post('/system-processing/uploadpost-result', function (req, resp) {
            var form = new formidable.IncomingForm()
            form.parse(req, function (err, fields, files) {
                    var oldpath = files.inputPostImage.path
                    var newpath = __dirname + '/../public/imgs/upload/' + files.inputPostImage.name

                    fs.rename(oldpath, newpath, function (err) {
                        if (err) throw err;
                        var title = fields.inputPostTitle

                        var postTags = fields.inputTags

                        var postTagsArr = postTags.split(',')

                        var trimmedTags = []

                        for(var i = 0; i < postTagsArr.length; i++){
                            var tagString = postTagsArr[i]
                            // console.log(typeof tagString)
                            // console.log(tagString.trim())
                            trimmedTags.push(tagString.trim())
                        }
                        // console.log(trimmedTags)
                        var user = req.session.user
                        var memeVisibility = (fields.inputVisibility === 'Private')
                        var sharedUser = fields.inputSharedUser
                        if (sharedUser !== ''){
                            memeModel.uploadMeme(title, files.inputPostImage.name, user, trimmedTags, memeVisibility, sharedUser, function () {
                                resp.redirect('/')
                            })   
                        }
                        else {
                            sharedUser = null
                            memeModel.uploadMeme(title, files.inputPostImage.name, user, postTagsArr, memeVisibility, sharedUser, function () {
                                    resp.redirect('/')
                            })
                        }
                    })
                })

    })

        server.get('/viewPublicMemes', function (req, resp) {
            memeModel.viewAllPublicMemes(function (list) {
                const data = {
                    list: list
                };
                resp.render('/index', {
                    data: data
                })
            })
        })

        server.get('/viewProfileMemes', function (req, resp) {

        })

        server.get('/viewMemeSearchByName', function (req, resp) {

        })

        server.get('/viewMemeSearchByTag', function (req, resp) {
            var tag = req.query.tag
            var user = req.session.user
            memeModel.viewMemesbySearchTag(user, tag, function(postList){
                const data = {
                    list: postList
                }
                resp.render('./index', {data: data})
            })
        })

        server.get('/uploadMeme', function (req, resp) {

        })

        server.get('/editMeme', function (req, resp) {

        })

        server.get('/deleteMeme', function (req, resp) {

        })

        server.get('/searchMemeByName', function (req, resp) {

        })

        server.get('/searchMemeByTag', function (req, resp) {

        })
    }


    //triallsaldapsdlasldalskdlkasdl



    module.exports.Activate = memeModule;