define([

], function(){

    var Post = Backbone.Model.extend({
        urlRoot: '/post',
        idAttribute: '_id'
    });

    return Post
});