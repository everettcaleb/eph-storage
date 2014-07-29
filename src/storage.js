(function() {
	var dataPiece;

	function Storage() {
		this.data = [];
	}

	function Storage_set(key, value, expire) {
		this.data[key] = { 
			value: value,
			timeout: setTimeout(Storage_internal_delete, expire, this, key),
		};
	}

	function Storage_get(key) {
		return this.data[key].value;
	}

	function Storage_delete(key) {
		dataPiece = this.data[key];
		clearTimeout(dataPiece.timeout);
		delete dataPiece;
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