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
		'./views/GameView'
	],

	function(LogPageView, RegistrationView,LogInView, AccountView, NavBarView,
	 	 	 Users, UsersView, AddPostView, PostsView, Post, PostView, User,
			 Admin, UserView, GameView) {

		var Router = Backbone.Router.extend({
			initialize: function(){

				 var me = new Admin({
									name: 'Jura',
									email: 'deadkeeper1@gmail.com',
									password: 'gmail'
								});
				//me.save();



				var self = this;
				this.currentView = null;
				this.userIn;
				this.navBarView = new NavBarView();

				console.log('Router inited');

				$.ajax({
					method: 'GET',
					url: '/session',
					async: false,
					success: function(){
						self.navBarView.render()
						self.userIn = true;
					},

					error: function(){
						self.userIn = false;
						console.log('err')
						Backbone.history.fragment = '';
						Backbone.history.navigate('#', {trigger: true})
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
				'game'				: 'game'
			},


			changeView : function(view){
				if(null !== this.currentView){
					this.currentView.undelegateEvents()
				}

				this.currentView = view;
				this.currentView.render()

			},

			logPage : function(){
				var self = this
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

			myaccount: function(){
				var self = this;
				jQuery.ajax({
					method: 'GET',
					url: '/session',
					async: false,
					success: function(user){
						console.log('Success ', user);
						self.changeView(new AccountView({ model: user}))

						self.userIn = true;
					},

					error: function(){
						Backbone.history.navigate('#', {trigger: true})
					}
				})
			},

			showAllUsers : function(){
				var self = this;

				var users = new Users;
					users.fetch({
						success: function(res, users){
							console.log(users)
							self.changeView(new UsersView({collection: users}))
						}
					})
			},

			showUser	: function(id){
				var self = this;
				var user = new User({ _id: id});
					user.fetch({
						success: function(res, user){
							self.changeView(new UserView({model: user}))

						},

						error: function(err){
							alert('Sorry, no such user!')
						}
					})

			},

			addNewPost: function(){
				this.changeView(new AddPostView())
			},

			posts: function(){
				this.changeView(new PostsView)
			},

			showPost: function(id){
				var self = this;
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
			}
		});

	return Router
});