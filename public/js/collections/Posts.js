define([
    '../models/Post'
],function(Post) {

    var Posts = Backbone.Collection.extend({
        model: Post,
        url: '/posts'
    });

    return Posts
});