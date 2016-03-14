define([
    'text!templates/PostsTemplate.html',
    '../collections/Posts'

], function(PostsTemplate, Posts){
    var PostsView = Backbone.View.extend({

        el: '#content',
        template: _.template(PostsTemplate),

        events: {
            'click div': 'read_post'
        },

        initialize: function(){
            console.log('Posts View Inited');
            var self = this;

            var posts = new Posts;
                posts.fetch({
                    async: false,

                    success: function(res, posts){
                        self.collection = posts;
                    }
                })
        },

        render: function(){
            this.$el.html(this.template(this.collection))
        },


        read_post : function(e){

            var $targetEl = $(e.target);
            var $div = $targetEl.closest('div');
            var id = $div.attr('id');

            Backbone.history.fragment = '';
            Backbone.history.navigate('#post/'+id, {trigger: true})
        }
    });

    return PostsView
});