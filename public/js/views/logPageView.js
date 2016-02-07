define([
    'text!templates/LogPageTemplate.html'
],

    function(LogPageTemplate){

        var LogPageView = Backbone.View.extend({

            el: '#content',

            template: LogPageTemplate,

            events: {
                'click #logIn'	: 'logIn',
                'click #registrate'	: 'registrate'
            },

            initialize : function(){
                console.log('LogPageView inited')
            },

            render: function(){
                this.$el.html(this.template)
            },

            registrate: function(){
                Backbone.history.navigate('#registration', {trigger:true})
            },

            logIn: function(){
                Backbone.history.navigate('#login', {trigger:true})
            }
        });

    return LogPageView
});