var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var session = require('express-session')
var morgan = require('morgan');
var crypto = require('crypto');

var routes = require('./routes');
var app = express();

//Data base config
mongoose.connect('localhost:/vrakashi_final');
var db = mongoose.connection;
db.on('open', function(){
    console.log('Vrakashi Data Base opened.')
});



///Middlewares
app.use(express.static(__dirname));
app.use(body_parser({urlencoded : true}));
app.use(session(
    {secret: 'ssshhhhh',
        saveUnitialized: true}
));
app.use(morgan('dev'));



app.use(routes);



 app.listen (3030, function() {
	console.log('Server started')
});