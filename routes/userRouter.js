var express = require('express');

var userRouter = express.Router();
var userHandler = require('../handlers/userHandler');

userRouter.route('/')
    .post(userHandler.saveUser);


userRouter.route('/:id')
    .get(userHandler.getUser)
    .put(userHandler.updateUser)
    .delete(userHandler.delteAccount);

module.exports = userRouter;