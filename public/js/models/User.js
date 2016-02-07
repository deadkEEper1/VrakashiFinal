define([

], function(){

    var User = Backbone.Model.extend({
        urlRoot: '/user',
        idAttribute: '_id'
    });

    return User
});