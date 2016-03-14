define([
    'text!templates/LogInTemplate.html',
    './NavBarView'

], function(LogInTemplate, NavBarView){

    var LogInView = Backbone.View.extend({
        el: '#content',
        template: _.template(LogInTemplate),

        events: {
            'click #submit' : 'logIn',
            'click #back'   :'back'
        },

        initialize: function(){
            console.log('Log In View Inited');
        },

        render: function(){
            this.$el.html(this.template );
        },

        logIn: function(){
            var email = $('#email').val();
            var pass = $('#password').val();

            if(email && pass){
                $.ajax({
                        method: 'POST',
                        url: '/session',
                        data: {
                            email: email,
                            password: pass
                        },

                        success: function(){
                            Backbone.history.navigate('#myaccount', {trigger: true});
                            var navBarView = new NavBarView();
                            navBarView.render();
                        },

                        error: function () {
                            alert('Please ensure that your email and pass entered correct');
                            $('.logIn').val('');
                        }
                    }
                )
            }
        },

        back: function(){
            Backbone.history.navigate('#', {trigger: true})
        }

    });

    return LogInView
});