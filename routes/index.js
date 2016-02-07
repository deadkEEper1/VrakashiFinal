var express = require('express');

var router = express.Router();




router.use('/user',         require('./userRouter'));
router.use('/session',      require('./sessionRouter'));
router.use('/users',       require('./usersRouter'));
router.use('/post',         require('./postRouter'));
router.use('/posts',       require('./postsRouter'))




module.exports = router;