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
		'./views/UserView'
	],

	function(LogPageView, RegistrationView,LogInView, AccountView, NavBarView,
	 	 	 Users, UsersView, AddPostView, PostsView, Post, PostView, User,
			 UserView) {

		var Router = Backbone.Router.extend({
			initialize: function(){
				 //var me = new User({
				 //					name: 'Jura',
				 //					email: 'deadkeeper1@gmail.com',
				 //					password: 'gmail',
				 //					admin: true
				 //				})
                 //
				 //me.save()

				var that = this;
				this.currentView = null;
				this.navBar = new NavBarView

				console.log('Router inited')

				$.ajax({
					method: 'GET',
					url: '/session',
					success: function(user){
						that.currentUser = user;
						that.navBar = new NavBarView;
						that.navBar.render()

					},

					error: function(){
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
				'post/:id'			: 'showPost'
			},

			changeView : function(view){
				if(null !== this.currentView){
					this.currentView.undelegateEvents()
				}

				this.currentView = view;
				this.currentView.render()

			},

			logPage: function(){
				this.changeView(new LogPageView)
			},

			registrate: function(){
				this.changeView(new	RegistrationView)
			},

			logIn	: function(){
				this.changeView(new LogInView)
			},

			myaccount: function(){
				var that = this;
				jQuery.ajax({
					method: 'GET',
					url: '/session',
					success: function(user){
						console.log('Success ', user);
						that.changeView(new AccountView({ model: user}))
						that.navBar.render()
					},

					error: function(){
						Backbone.history.navigate('#', {trigger: true})
					}
				})





			},

			showAllUsers : function(){
				var that = this;

				var users = new Users
					users.fetch({
						success: function(res, users){
							console.log(users)
							that.changeView(new UsersView({collection: users}))
						}
					})
			},

			showUser	: function(id){
				var that = this;
				var user = new User({ _id: id})
					user.fetch({
						success: function(res, user){
							that.changeView(new UserView({model: user}))

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
				var that = this;
				var post = new Post({_id: id})
					post.fetch({
						success: function(res, post){
							console.log(post)
							that.changeView(new PostView({model: post}) )
						},

						error: function(res){
							alert('Sorry. There is no such post.');

							Backbone.history.navigate('#posts', {trigger: true})
						}
					})
			}
		});

	return Router
});