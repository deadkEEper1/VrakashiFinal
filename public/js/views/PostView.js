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
            console.log('Post View inited')
            var that = this;


            $.ajax({
                method: 'GET',
                url: '/session',

                success: function(user){
                    if(that.model.author &&
                        user._id === that.model.author._id){
                        console.log('Matching')
                        $('#deleteMyPost').show()
                    }

                    if(user.admin){
                        $('.adminBtn').show()
                    }
                },

                error: function(res){
                }
            })
        },

        render: function(){
            this.$el.html(this.template(this.model))
        },

        deleteMyPost: function(){
            var id = this.model._id
            var post = new Post({_id: id})
            post.destroy({
                success: function(){
                    alert('Post wass deleted successfully')

                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#myaccount', {trigger: true})
                },

                error: function(){
                    alert('Something is wrong')
                }
            })
        },

        deletePost : function(){
            var id = this.model._id
            var post = new Post({_id: id})
            post.destroy({
                success: function(){
                    alert('Post wass deleted successfully')

                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#posts', {trigger: true})
                },

                error: function(){
                    alert('Something is wrong')
                }
            })
        }
    })

    return PostView
})