define([
    'text!templates/InviteTemplate.html'
    ],

    function (InvitePageTemplate) {
        var InviteView = Backbone.View.extend({
            el: '#content',
            template: _.template(InvitePageTemplate),

            initialize: function (){
                console.log('Invite page inited')
            },

            render: function(){
                this.$el.html(this.template)
            }
        });

        return InviteView
    });