require.config({
	paths: {
		'jquery': 'libs/jquery/dist/jquery',
		'underscore': 'libs/underscore/underscore',
		'backbone': 'libs/backbone/backbone',
		'templates': '../templates',
		'text':  'libs/text/text'

	},


	shim: {
        'app': ['backbone']
	}
})


require(['./app'], function(App) {
	App.init()
})