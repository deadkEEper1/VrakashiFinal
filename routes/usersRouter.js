var express = require('express');

var usersRouter = express.Router();
var usersHandler = require('../handlers/usersHandler');

usersRouter.route('/')
    .get(usersHandler.getAllUSers);

module.exports = usersRouter;