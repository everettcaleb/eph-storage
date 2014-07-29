(function() {
	var dataPiece;

	function Storage() {
		this.data = [];
	}

	function Storage_set(key, value, expire) {
		this.data[key] = { 
			value: value,
			timeout: expire > 0 ? setTimeout(Storage_internal_delete, expire, this, key) : null,
		};
	}

	function Storage_get(key) {
		return this.data[key].value;
	}

	function Storage_delete(key) {
		clearTimeout(this.data[key].timeout);
		delete this.data[key];
	}

	function Storage_purge() {
		this.data = [];
	}

	function Storage_internal_delete(storage, key) {
		delete storage.data[key];
	}

	Storage.prototype.set = Storage_set;
	Storage.prototype.get = Storage_get;
	Storage.prototype.delete = Storage_delete;
	Storage.prototype.purge = Storage_purge;
	exports.Storage = Storage;
})();