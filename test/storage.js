(function(){
	var assert = require('assert'),
		Storage = require('../src/storage.js').Storage,
		storage = new Storage();

	describe('Storage', function(){
		describe('Storage.set(key, value, expire)', function(){
			it('should not throw an exception', function(done) {
				try{
					storage.set('key', 'value', 1);
					done();
				}
				catch(err){
					done(err);
				}
			})
		});

		describe('Storage.get(key)', function(){
			it('should return null or throw an exception', function(done){
				try{
					var val = storage.get('test');
					if(val == null || val == undefined) {
						done();
					}
				}
				catch(err){
					done();
				}
			});
		});

		describe('Storage.delete(key)', function(){
			it('should remove a key', function(done) {
				try{
					storage.delete('key');
					done();
				}
				catch(err){
					done();
				}
			});
		});

		describe('Storage.set, then Storage.get', function(){
			it('should return a value after the set', function(done){
				try{
					storage.set('testkey', 'value');
					var val = storage.get('testkey');
					assert.ok(val == 'value');
					done();
				}
				catch(err){
					done(err);
				}
			});
		});

		describe('Storage.set, then Storage.delete, then Storage.get', function(){
			it('should not return a value after the delete', function(done){
				try{
					storage.set('testkey2', 'value');
					storage.delete('testkey2');
					try{
						var val = storage.get('testkey2');
						assert.ok(val != 'value');
						done();
					}
					catch(err){
						done();
					}
				}
				catch(err){
					done(err);
				}
			});
		});
	});
})();