define([
    'text!templates/AddPosttemplate.html',
    '../models/Post'

],  function(AddPostTemplate, Post){

    var AddPostView = Backbone.View.extend({

        el: '#content',
        template: _.template(AddPostTemplate),

        events: {
            'click #addPost'    : 'createPost'
        },

        initialize: function(){
            var self = this;

            $.ajax({
                method: 'GET',
                url: '/session',
                async: false,

                success: function(res){
                    self.author = res._id
                }
            });
        },

        render: function(){
            this.$el.html(this.template)
        },

        createPost: function(){
            var title = $('#title').val();
            var body = $('#body').val();

            var newPost = new Post ({
                title: title,
                body: body,

                author: this.author
            });

            newPost.save({}, {
                success: function(){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#posts', {trigger: true})
                },

                error: function(err){
                    console.log(err)
                }
            })
        }
    });

    return AddPostView
});