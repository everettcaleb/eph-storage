(function(){
	var server = require('./src/server.js'),
		config = require('./config.js');

	server.run(config.Config);
})();