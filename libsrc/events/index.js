//消息机制（监听者模式）
export default class movEvents {
	_movEvents = {};
	
	emit (name, ...data) {
		if (!this._movEvents[name]) {
			return;
		}
		this._movEvents[name].forEach((v) => {
			v.fun(...data);
			if (v.count > 0) {
				v.count -= 1;
			}
		});
		this._movEvents[name] = this._movEvents[name].filter((v) => {
			return v.count != 0;
		});
	}
	
	on (eName, fun, count = -1) {
		if (!eName) {
			throw new Error('事件名不允许为空');
		}
		if (typeof a === 'number') {
			throw new Error('事件名不允许为数字');
		}
		let nameInfo = eName.split('.');
		let name = nameInfo[0];
		if (!this._movEvents[name]) {
			this._movEvents[name] = [];
		}
		this._movEvents[name].push({
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
		if (!this._movEvents[name]) {
			return;
		}
		if (!key) {
			if (!fun) {
				this._movEvents[name] = undefined;
				return;
			}
			this._movEvents[name] = this._movEvents[name].filter((v) => {
				return v.fun != fun;
			});
			return;
		}
		
		if (key) {
			if (fun) {
				this._movEvents[name] = this._movEvents[name].filter((v) => {
					return v.key != key && v.fun == fun;
				});
				return;
			}
			this._movEvents[name] = this._movEvents[name].filter((v) => {
				return v.key != key;
			});
		}
	}
}
