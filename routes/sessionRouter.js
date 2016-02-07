var express = require('express');

var sessionRouter = express.Router();
var sessionHandler = require('../handlers/sessionHandler');
sessionRouter.route('/')
    .get(sessionHandler.getSession)
    .post(sessionHandler.logIn)
    .delete(sessionHandler.logOut)

module.exports = sessionRouter