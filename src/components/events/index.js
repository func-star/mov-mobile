export default class moEvents {
	_moEvents = {};
	
	emit (name, ...data) {
		if (!this._moEvents[name]) {
			return;
		}
		this._moEvents[name].forEach((v) => {
			v.fun(...data);
			if (v.count > 0) {
				v.count -= 1;
			}
		});
		this._moEvents[name] = this._moEvents[name].filter((v) => {
			return v.count != 0;
		});
	}
	
	on (eName, fun, count = -1) {
		if (!eName) {
			return;
		}
		let nameInfo = eName.split('.');
		let name = nameInfo[0];
		if (!this._moEvents[name]) {
			this._moEvents[name] = [];
		}
		this._moEvents[name].push({
			fun: fun,
			count: count,
			key: nameInfo[1],
		});
	}
	
	once (name, fun) {
		this.on(name, fun, 1);
	}
	
	off (eName, fun) {
		if (!eName) {
			return;
		}
		let nameInfo = eName.split('.');
		let name = nameInfo[0];
		let key = nameInfo[1];
		if (!this._moEvents[name]) {
			return;
		}
		if (!key) {
			if (!fun) {
				this._moEvents[name] = undefined;
				return;
			}
			this._moEvents[name] = this._moEvents[name].filter((v) => {
				return v.fun != fun;
			});
			return;
		}
		
		if (key) {
			if (fun) {
				this._moEvents[name] = this._moEvents[name].filter((v) => {
					return v.key != key && v.fun == fun;
				});
				return;
			}
			this._moEvents[name] = this._moEvents[name].filter((v) => {
				return v.key != key;
			});
		}
	}
}

