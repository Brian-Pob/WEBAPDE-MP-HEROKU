
const commentModel = require('../models/commentModel')
const memeModel = require('../models/memeModel')

const formidable = require('formidable');
const bodyParser = require('body-parser')
const fs = require('fs');
 

function commentModule(server){
    
    server.post('/addComment', function (req, resp) {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields) {
            console.log('Saving Comment!')
            if (err) throw err
                var user = req.session.user
                var comment = fields.comment
                var parentComment = null
            if(parentComment !==''){ 
                commentModel.addComment(user, comment, parentComment ,function(){
                resp.redirect('/')
                });//addInv
            }
            else{ // if null it means it came from a POST. 
                //parentComment = null
                commentModel.addComment(user, comment, parentComment ,function(){
                    memeModel.addCommentID(_id, function(){
                        resp.redirect('/')
                    })
                });//addInv
            }
        });//parse
    })
    
    server.get('/viewComments', function (req, resp){
        commentModel.viewComments(function(list){
            const data = {list:list};
            resp.render('/index', {data : data})
        })
    })

}

module.exports.Activate = commentModule;