define([
    'text!templates/PostTemplate.html',
    '../models/Post'

], function(PostTemplate, Post){

    var PostView = Backbone.View.extend({
        el: '#content',
        template: _.template(PostTemplate),

        events:{
            'click #deletePost'     : 'deletePost',
            'click #deleteMyPost'   : 'deleteMyPost'
        },

        initialize: function(){
            var self = this;

            $.ajax({
                method: 'GET',
                url: '/session',

                success: function(user){
                    if(user.admin){
                        $('#adminScope').html('<button id="deletePost" class="btn btn-danger">Delete this post(Admin Button)</button> <br/>')

                    }else if(self.model.author &&
                        user._id === self.model.author._id){
                        $('#usersButtons').html('<button id="deleteMyPost" class="btn btn-danger">Delete(user button)</button>')
                    }
                }
            })
        },

        render: function(){
            this.$el.html(this.template(this.model))
        },

        deleteMyPost: function(){
            var id = this.model._id;
            var post = new Post({_id: id});

            post.destroy({
                success: function(){
                    alert('Post wass deleted successfully');

                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#myaccount', {trigger: true})
                },

                error: function(){
                    alert('Something is wrong')
                }
            })
        },

        deletePost : function(){
            var id = this.model._id;
            var post = new Post({_id: id});
            post.destroy({
                success: function(){
                    alert('Post wass deleted successfully');

                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#posts', {trigger: true})
                },

                error: function(){
                    alert('Something is wrong')
                }
            })
        }
    });

    return PostView
});