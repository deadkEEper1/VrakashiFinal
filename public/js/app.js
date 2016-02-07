define(['./router'],
	function(Router) {

		var initialize = function(){
			new Router
			Backbone.history.start()
		}

		return {
			init: initialize
		}
	})