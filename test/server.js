(function() {
	var assert = require('assert'),
		server = require('../src/server.js'),
		request = require('supertest');

	server.run({
		port:3000
	});

	describe('Server', function(){
		describe('GET /', function(){
			it("should return 200 OK", function(done) {
				request(server.app)
					.get('/')
					.expect(200)
					.end(done);
			});
		});

		describe('GET /*', function(){
			it('should return 404 Not Found', function(done){
				request(server.app)
					.get('/abc')
					.expect(404)
					.end(done);
			});
		});

		describe('POST /*?value=*', function(){
			it('should return 200 OK', function(done){
				request(server.app)
					.post('/abc?value=test')
					.expect(200)
					.end(done);
			});
		});

		describe('DELETE /*', function(){
			it('should return 200 OK', function(done) {
				request(server.app)
					.delete('/abc')
					.expect(200)
					.end(done);
			})
		});

		describe('POST /*?value=*, then GET /*', function(){
			it('should return 200 OK for first part, 200 OK for the second', function(done){
				request(server.app)
					.post('/test?value=blah')
					.expect(200)
					.end(function(err, res){
						if(err) { done(err); return; }

						request(server.app)
							.get('/test')
							.expect(200)
							.end(done);
					});
			});
		});

		describe('POST /*?value=*, then DELETE /*, then GET /*', function(){
			it('should return 200, 200, then 404', function(done) {
				request(server.app)
					.post('/blah?value=test')
					.expect(200)
					.end(function(err, res){
						if(err) { done(err); return; }

						request(server.app)
							.delete('/blah')
							.expect(200)
							.end(function(err, res) {
								if(err) { done(err); return; }

								request(server.app)
									.get('/blah')
									.expect(404)
									.end(done);
							});
					});
			});
		});
	});
})();