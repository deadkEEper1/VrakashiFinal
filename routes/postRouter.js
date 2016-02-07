var express = require('express');

var postRouter = express.Router();
var postHandler = require('../handlers/postHandler');
postRouter.route('/')
    .post(postHandler.createPost);

postRouter.route('/:id')
    .get(postHandler.getPost)
    .delete(postHandler.deletePost)

module.exports = postRouter