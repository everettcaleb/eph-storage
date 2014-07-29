(function(){
	var express = require('express'),
		app = express(),
		Storage = require('./storage.js').Storage,
		storage = new Storage();

	function run(config) {
		app.get('/', handleRoot);
		app.get(/\/(.+)/, handleGet);
		app.post(/\/(.+)/, handlePost);
		app.delete(/\/(.+)/, handleDelete);

		app.listen(config.port);
	}

	function handleRoot(req, res) {
		res.end('eph /\n');
	}

	function handleGet(req, res) {
		try{
			res.end(storage.get(req.params['0']));
		}
		catch(err) {
			res.status(404).end('Not Found\n');
		}
	}

	function handlePost(req, res) {
		try{
			storage.set(req.params['0'], req.query.value || '', req.query.expire || 3600000)
			res.end('Set\n');
		}
		catch(err) {
			res.status(400).end('Bad Request\n');
		}
	}

	function handleDelete(req, res) {
		try{
			storage.delete(req.params['0']);
			res.end('Deleted\n');
		}
		catch(err){
			res.status(500).end('Internal Error\n');
		}
	}

	exports.run = run;
})();