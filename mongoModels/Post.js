var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({

    title: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'

    }

});


var Post = mongoose.model('posts', postSchema);

module.exports = Post;
