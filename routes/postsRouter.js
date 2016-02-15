var express = require('express');

var postsRouter = express.Router();
var postsHandler = require('../handlers/postsHandler');

postsRouter.route('/')
    .get(postsHandler.getAllPosts);

postsRouter.route('/:author')
    .get(postsHandler.findByAuthor);

module.exports = postsRouter;