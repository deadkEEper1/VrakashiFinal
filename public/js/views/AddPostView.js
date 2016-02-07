define([
    'text!templates/AddPosttemplate.html',
    '../models/Post'

],  function(AddPosttemplate, Post){

    var AddPostView = Backbone.View.extend({

        el: '#content',

        template: _.template(AddPosttemplate),

        events: {
            'click #addPost'    : 'createPost'
        },


        initialize: function(){
            console.log('Add New Post View Inited');

            var that = this;

            $.ajax({
                method: 'GET',
                url: '/session',
                async: false,

                success: function(res){
                    that.author = res._id
                }
            });
        },

        render: function(){
            this.$el.html(this.template)
        },

        createPost: function(){
            var title = $('#title').val()
            var body = $('#body').val()

            var newPost = new Post ({
                title: title,
                body: body,

                author: this.author
            });

            newPost.save({}, {
                success: function(res){
                    console.log(res)

                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#posts', {trigger: true})

                }
            })
        }


    });

    return AddPostView
})