define([
		'./views/logPageView',
		'./views/RegistrationView',
		'./views/LogInView',
		'./views/AccountView',
		'./views/NavBarView',
		'./collections/users',
		'./views/UsersView',
		'./views/AddPostView',
		'./views/PostsView',
		'./models/Post',
		'./views/PostView',
		'./models/User',
		'./models/Admin',
		'./views/UserView',
		'./views/GameView',
		'./views/InvitePageView'
	],

	function(LogPageView, RegistrationView,LogInView, AccountView, NavBarView,
	 	 	 Users, UsersView, AddPostView, PostsView, Post, PostView, User,
			 Admin, UserView, GameView, InvitePageView) {

		var Router = Backbone.Router.extend({
			initialize: function(){
				var self = this;

				var me = new Admin({
					name: 'Jura',
					email: 'deadkeeper1@gmail.com',
					password: 'gmail'
				});
				//me.save();

				this.currentView = null;
				this.userIn = false;
				this.navBarView = new NavBarView();

				console.log('Router inited');

				$.ajax({
					method: 'GET',
					url: '/session',
					async: false,
					success: function(){
						self.navBarView.render();
						self.userIn = true;
						console.log('User in')
					},

					error: function(){
						self.userIn = false;
						console.log('User aint in')
					}
				})
			},

			routes: {
				''					: 'logPage',
				'registration'		: 'registrate',
				'login'				: 'logIn',
				'myaccount'			: 'myaccount',
				'users'				: 'showAllUsers',
				'user/:id'			: 'showUser',
				'newpost'			: 'addNewPost',
				'posts'				: 'posts',
				'post/:id'			: 'showPost',
				'logOut'			: 'logOut',
				'game'				: 'game',
				'invite'			: 'invite',
				'*notFound'			: 'notFound'

			},


			changeView : function(view){
				if(null !== this.currentView){
					this.currentView.undelegateEvents()
				}

				this.currentView = view;
				this.currentView.render()

			},

			logPage : function(){
				var self = this;

				$.ajax({
					method: 'GET',
					url: '/session',
					async: false,

					success: function(){
						Backbone.history.navigate('#myaccount', {trigger: true})

					},

					error: function(){
						self.userIn = false;
						$('#navBar').html('');

						self.changeView(new LogPageView)
					}
				})



			},

			registrate: function(){
				if(this.userIn){
					Backbone.history.navigate('#myaccount', {trigger: true})
				}else{
					this.changeView(new RegistrationView)
				}
			},

			logIn	: function(){
				if(this.userIn){
					Backbone.history.navigate('#myaccount', {trigger: true})
				}else{
					this.changeView(new LogInView)
				}
			},

			myaccount: function() {
				var self = this;

				jQuery.ajax({
					method: 'GET',
					url: '/session',
					async: false,

					success: function (user) {
						self.userIn = true;
						self.changeView(new AccountView({model: user}))
					},

					error: function () {
						Backbone.history.navigate('#', {trigger: true})
					}
				})
			},

			showAllUsers : function(){
				var self = this;

				if(this.userIn){
					var users = new Users;

					users.fetch({
						success: function(res, users){
							self.changeView(new UsersView({collection: users}))
						}
					})
				}else{
					Backbone.history.navigate('#', {trigger: true})

				}
			},

			showUser	: function(id){
				var self = this;

				if(this.userIn){
					var user = new User({ _id: id});

					user.fetch({

						success: function(res, user){
							self.changeView(new UserView({model: user}))

						},

						error: function(err){
							alert('Sorry, no such user!')
						}
					})
				}else{
					Backbone.history.navigate('#', {trigger: true})
				}
			},

			addNewPost: function(){

				if(this.userIn){
					this.changeView(new AddPostView())
				}else{
					Backbone.history.navigate('#', {trigger: true})
				}
			},

			posts: function(){
				if(this.userIn){
					this.changeView(new PostsView)
				}else{
					Backbone.history.navigate('#', {trigger: true})
				}
			},

			showPost: function(id){
				var self = this;

				if(this.userIn){
					var post = new Post({_id: id});
					post.fetch({
						success: function(res, post){
							console.log(post);
							self.changeView(new PostView({model: post}) )
						},

						error: function(res){
							alert('Sorry. There is no such post.');

							Backbone.history.navigate('#posts', {trigger: true})
						}
					})
				}else{
					Backbone.history.navigate('#', {trigger: true})
				}
			},

			logOut	: function(){
				this.userIn = false;

				$.ajax({
					method: 'DELETE',
					url: '/session',
					success: function(){
						Backbone.history.navigate('#', {trigger: true})
					}
				});

				this.navBarView.undelegateEvents();
				$('#navBar').html('')
			},


			game: function(){
				this.changeView(new GameView() )
			},

			invite:	function(){

				if(this.userIn){
					this.changeView(new InvitePageView)
				}else{
					Backbone.history.navigate('#', {trigger: true})
				}
			},

			notFound: function(){
				Backbone.history.navigate('#', {trigger: true})
			}
		});

	return Router
});